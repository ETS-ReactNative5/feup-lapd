const axios = require('axios')
const qs = require('querystring');
var openweathermap = require("../config/config.js").openweathermap;
var { getCountryName } = require("../utils/utils");

exports.getForecast = async (city) => {
  const data = {
    q: city,
    appid: openweathermap.appid,
    units: 'metric'
  }

  return await axios.get(`${openweathermap.url}/forecast?${qs.stringify(data)}`)
}

exports.getLocationCity = async (city) => {
  const data = {
    q: city,
    appid: openweathermap.appid
  }

  let response = await axios.get(`${openweathermap.url}/forecast?${qs.stringify(data)}`)

  if (response.status === 200) {
    const city = response.data.city;
    return {
      city: city.name,
      country: getCountryName(city.country)
    }
  }

  return null;
}
