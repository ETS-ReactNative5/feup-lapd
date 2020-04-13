const axios = require('axios')
const qs = require('querystring');
var zomato = require("../config/config.js").zomato;

exports.getRestaurants = async (city) => {
  let response = await axios({
    method: "GET",
    url: `${zomato.url}/locations?query=${city}`,
    headers: {
      "user-key": zomato.user_key,
    }
  });

  let entity_id = response.data.location_suggestions[0].entity_id || null

  if(entity_id === null)
    return null;

  const data = {
    entity_type: "city",
    entity_id: entity_id
  }

  // TODO: Only shows 20 options at a time

  return await axios({
    method: "GET",
    url: `${zomato.url}/search?${qs.stringify(data)}`,
    headers: {
      "user-key": zomato.user_key,
    }
  });
}
