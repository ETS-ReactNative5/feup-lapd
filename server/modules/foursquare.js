const axios = require('axios')
const qs = require('querystring');
var foursquare = require("../config/config.js").foursquare;

const limit = 50;         //max limit value
const v = 20190425;       //hardcoded value present in Foursquare documentation
const number_items = 20;  //number of item each request returns

getRequestData = (city, category_id) => {
  return {
    client_id: foursquare.client_id,
    client_secret: foursquare.client_secret,
    v: v,
    near: city,
    categoryId: category_id,
    limit: limit,
    intent: "checkin"
  }
}

getPhoto = async (venue_id) => {
  const data = {
    client_id: foursquare.client_id,
    client_secret: foursquare.client_secret,
    v: v
  }

  try {
    let request = await axios.get(`${foursquare.url}/${venue_id}/photos?${qs.stringify(data)}`);
    let photos = request.data.response.photos

    if(photos.count > 0){
      let photo = photos.items[0]
      return `${photo.prefix}original${photo.suffix}`;
    }
  } catch (error) {
    console.log("Error while getting a photo to the venue. Maybe quota exceeded.")
  }

  return null
}

exports.getShops = async (city, offset) => {
  const data = getRequestData(city, foursquare.shops_id)

  try {
    let request = await axios.get(`${foursquare.url}/search?${qs.stringify(data)}`);
    let results_found = request.data.response.venues.length
    let shops = request.data.response.venues.slice(offset, offset+number_items);

    for (let i = 0; i < shops.length; i++) {
      shops[i].photoUrl = await getPhoto(shops[i].id);
    }

    request.data.response.venues = shops;
    request.data.meta.results_found = results_found;
    request.data.meta.results_start = offset;
    request.data.meta.results_shown = shops.length;

    return request;
  } catch (error) {
    console.log("Error in getting shops")
  }

  throw "An error occurred while getting shops";
}

exports.getPOIs = async (city, offset, filters) => {
  let options = filters ? filters.split("&") : [ 'art', 'outdoor', 'nightlife', 'event' ];

  const outdoorsData = getRequestData(city, foursquare.outdoors_id)
  const artsData = getRequestData(city, foursquare.arts_id)
  const nightlifeData = getRequestData(city, foursquare.nightlife_id)
  const eventData = getRequestData(city, foursquare.event_id)

  let outdoors = null
  let art = null
  let nightlife = null
  let events = null
  try {
    for (let i = 0; i < options.length; i++) {
      switch (options[i]) {
        case "outdoor":
          outdoors = await axios.get(`${foursquare.url}/search?${qs.stringify(outdoorsData)}`);
          break;
        case "art":
          art = await axios.get(`${foursquare.url}/search?${qs.stringify(artsData)}`);
          break;
        case "nightlife":
          nightlife = await axios.get(`${foursquare.url}/search?${qs.stringify(nightlifeData)}`);
          break;
        case "event":
          events = await axios.get(`${foursquare.url}/search?${qs.stringify(eventData)}`);
          break;
        default:
          break;
      }
    }
  } catch (error) {
    console.log("Error: ", error)
    return;
  }

  outdoors = outdoors ? outdoors.data.response.venues : [];
  art = art ? art.data.response.venues : [];
  nightlife = nightlife ? nightlife.data.response.venues : [];
  events = events ? events.data.response.venues : [];

  let venues = []
  let number_venues = art.length + outdoors.length + nightlife.length + events.length;

  // Mixing all arrays
  let a = 0, o = 0, n = 0, e = 0, v = 0
  while(v < number_venues){
    if(o < outdoors.length) venues[v++] = outdoors[o++]
    if(a < art.length) venues[v++] = art[a++]
    if(n < nightlife.length) venues[v++] = nightlife[n++]
    if(e < events.length) venues[v++] = events[e++]
  }

  let pois = venues.slice(offset, offset+number_items);

  for (let i = 0; i < pois.length; i++) {
    pois[i].photoUrl = await getPhoto(pois[i].id);
  }

  return {
    meta: {
      code: 200,
      results_found: number_venues,
      results_start: offset,
      results_shown: pois.length
    },
    response: {
      venues: pois
    }
  }
}
