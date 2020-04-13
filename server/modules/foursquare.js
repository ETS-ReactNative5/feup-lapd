const axios = require('axios')
const qs = require('querystring');
var foursquare = require("../config/config.js").foursquare;

const v = 20190425 //hardcoded value present in Foursquare documentation

getRequestData = (city, category_id) => {
  return {
    client_id: foursquare.client_id,
    client_secret: foursquare.client_secret,
    v: v,
    near: city,
    categoryId: category_id
  }
}

exports.getShops = async (city) => {
  const data = getRequestData(city, foursquare.shops_id)

  return await axios.get(`${foursquare.url}/search?${qs.stringify(data)}`);
}

exports.getPOIs = async (city) => {
  const artsData = getRequestData(city, foursquare.arts_id)
  const outdoorsData = getRequestData(city, foursquare.outdoors_id)
  const nightlifeData = getRequestData(city, foursquare.nightlife_id)
  const eventData = getRequestData(city, foursquare.event_id)

  // TODO: Choose each ones the user wants (filters)

  return {
    art: await axios.get(`${foursquare.url}/search?${qs.stringify(artsData)}`),
    outdoors: await axios.get(`${foursquare.url}/search?${qs.stringify(outdoorsData)}`),
    nightlife: await axios.get(`${foursquare.url}/search?${qs.stringify(nightlifeData)}`),
    events: await axios.get(`${foursquare.url}/search?${qs.stringify(eventData)}`)
  }
}
