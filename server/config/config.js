require("dotenv").config();

module.exports = {
  amadeus: {
    auth_url: "https://test.api.amadeus.com/v1/security/oauth2/token",
    url: "https://test.api.amadeus.com/v2/shopping/hotel-offers",
    client_id: process.env.AMADEUS_CLIENT_ID,
    client_secret: process.env.AMADEUS_CLIENT_SECRET,
    grant_type: "client_credentials"
  },
  openweathermap: {
    url: "http://api.openweathermap.org/data/2.5",
    appid: process.env.OPENWEATHERMAP_APPID
  },
  zomato: {
    url: "https://developers.zomato.com/api/v2.1",
    user_key: process.env.ZOMATO_USER_KEY
  },
  foursquare: {
    url: "https://api.foursquare.com/v2/venues",
    arts_id: "4d4b7104d754a06370d81259",
    nightlife_id: "4d4b7105d754a06376d81259",
    outdoors_id: "4d4b7105d754a06377d81259",
    event_id: "4d4b7105d754a06373d81259",
    shops_id: "4d4b7105d754a06378d81259",
    client_id: process.env.FOURSQUARE_CLIENT_ID,
    client_secret: process.env.FOURSQUARE_CLIENT_SECRET
  },
  mapquest: {
    url: "http://open.mapquestapi.com/geocoding/v1/address",
    key: process.env.MAPQUEST_KEY
  },
  pixabay: {
    url: "https://pixabay.com/api",
    key: process.env.PIXABAY_KEY
  },
  serpwow: {
    url: "https://api.serpwow.com/live/search",
    api_key: process.env.SERPWOW_KEY,
    search_type: "images"
  }
}
