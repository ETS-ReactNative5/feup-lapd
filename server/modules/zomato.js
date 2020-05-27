const axios = require('axios')
const qs = require('querystring');
var zomato = require("../config/config.js").zomato;
var dataStorage = require("../utils/data_storage");

// Get filename of request saved in local storage
const getRestaurantsFilename = (city, offset, sort = "", order = "") => {
  const data = {
    city: city,
    offset: offset,
    sort: sort,
    order: order
  }

  return `restaurants?${qs.stringify(data)}`
}

// Make request to Zomato API and return response
exports.getRestaurants = async (city, offset, sort, order) => {
  filename = getRestaurantsFilename(city, offset, sort, order)
  storedResponse = dataStorage.getItem(filename)

  if(storedResponse !== null) return JSON.parse(storedResponse)

  let response = await axios({
    method: "GET",
    url: `${zomato.url}/locations?query=${city}`,
    headers: {
      "user-key": zomato.user_key,
    }
  });

  let entity_id = response.data.location_suggestions[0].entity_id || null;
  let entity_type = response.data.location_suggestions[0].entity_type || null;

  if(entity_id === null)
    return null;

  // only accept cities, zones and subzones
  if(entity_type !== "city" && entity_type !== "zone" && entity_type !== "subzone"){
    return null;
  }

  const data = {
    entity_type: entity_type,
    entity_id: entity_id,
    start: offset,            //fetch results after offset
    sort: sort,               //cost, rating or real_distance
    order: order              //asc or desc
  }

  response =  await axios({
    method: "GET",
    url: `${zomato.url}/search?${qs.stringify(data)}`,
    headers: {
      "user-key": zomato.user_key,
    }
  });

  dataStorage.setItem(filename, JSON.stringify(response.data))
  return response.data
}
