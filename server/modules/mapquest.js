const axios = require('axios')
const qs = require('querystring');
var mapquest = require("../config/config.js").mapquest;

// Make request to MapQuest API and return response
exports.getLatLon = async (location) => {
  const data = {
    location: location,
    key: mapquest.key
  }

  response = await axios.get(`${mapquest.url}?${qs.stringify(data)}`)

  if (response.status == 200 && response.data.info.statuscode == 0){
    latLng = response.data.results[0].locations[0].latLng
    return {
      latitude: latLng.lat,
      longitude: latLng.lng
    }
  }

  return null
}
