const axios = require('axios')
const qs = require('querystring');
var tokenStorage = require("../utils/token_storage");
var dataStorage = require("../utils/data_storage");
var amadeus = require("../config/config.js").amadeus;

const fetchToken = async () => {
  const requestBody = {
    grant_type: amadeus.grant_type,
    client_id: amadeus.client_id,
    client_secret: amadeus.client_secret
  }

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  await axios.post(amadeus.auth_url, qs.stringify(requestBody), config)
    .then((res) => {
      setToken(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
};

const setToken = res => {
  tokenStorage.setItem("amadeus_token", res.token_type + " " + res.access_token);
  tokenStorage.setItem("amadeus_token_expires", new Date().getTime() + parseInt(res.expires_in) * 1000);
};

const getToken = async () => {
  if (tokenStorage.length === 0 || new Date(parseInt(tokenStorage.getItem("amadeus_token_expires"))) <= new Date()){
    await fetchToken();
  }

  return tokenStorage.getItem("amadeus_token");
};

const getFilename = (latitude, longitude, radius, sort = "", ratings = "", priceRange = "") => {
  const data = {
    latitude: latitude,
    longitude: longitude,
    radius: radius,
    sort: sort,
    ratings: ratings,
    priceRange: priceRange
  }

  return `hotels?${qs.stringify(data)}`
}

exports.getHotels = async (latitude, longitude, radius, sort, ratings, priceRange) => {
  filename = getFilename(latitude, longitude, radius, sort, ratings, priceRange)
  storedResponse = dataStorage.getItem(filename)

  if(storedResponse !== null) return JSON.parse(storedResponse)

  const data = {
    latitude: latitude,
    longitude: longitude,
    radius: radius,             // max is 300
    radiusUnit: "KM",
    currency: "EUR"
  }

  if(sort) data['sort'] = sort                      // PRICE or DISTANCE
  if(ratings) data['ratings'] = ratings             // 1, 2, 3, 4 or 5
  if(priceRange) data['priceRange'] = priceRange    // min-max

  response = await axios({
    method: "GET",
    url: `${amadeus.url}?${qs.stringify(data)}`,
    headers: {
      Authorization: await getToken(),
    }
  });

  dataStorage.setItem(filename, JSON.stringify(response.data))

  return response.data
}
