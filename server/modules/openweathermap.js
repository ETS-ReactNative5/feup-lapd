const axios = require('axios')
const qs = require('querystring');
var openweathermap = require("../config/config.js").openweathermap;

exports.getForecast = async (city) => {
  const data = {
    q: city,
    appid: openweathermap.appid,
    units: 'metric'
  }

  return await axios.get(`${openweathermap.url}/forecast?${qs.stringify(data)}`)
}
