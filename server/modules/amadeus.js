const axios = require('axios')
const qs = require('querystring');
var localStorage = require("../utils/local_storage");
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
  localStorage.setItem("amadeus_token", res.token_type + " " + res.access_token);
  localStorage.setItem("amadeus_token_expires", new Date().getTime() + parseInt(res.expires_in) * 1000);
};

const getToken = async () => {
  if (localStorage.length === 0 || new Date(parseInt(localStorage.getItem("amadeus_token_expires"))) <= new Date()){
    await fetchToken();
  }

  return localStorage.getItem("amadeus_token");
};

exports.getHotels = async (cityCode) => {
  const data = {
    cityCode: cityCode,
    radius: 30, // max is 300
    radiusUnit: "KM"
  }

  return await axios({
    method: "GET",
    url: `${amadeus.url}?${qs.stringify(data)}`,
    headers: {
      Authorization: await getToken(),
    }
  });
}
