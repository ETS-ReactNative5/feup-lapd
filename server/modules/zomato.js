const axios = require('axios')
const qs = require('querystring');
var zomato = require("../config/config.js").zomato;

// This endpoint only returs 20 restaurants at a time, use offset parameter to get the next 20 restaurants
exports.getRestaurants = async (city, offset, sort, order) => {
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

  return await axios({
    method: "GET",
    url: `${zomato.url}/search?${qs.stringify(data)}`,
    headers: {
      "user-key": zomato.user_key,
    }
  });
}
