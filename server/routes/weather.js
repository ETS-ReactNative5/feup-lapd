var express = require("express");
var router = express.Router();
const { getForecast } = require("../modules/openweathermap");

/* GET home page. */
router.get("/", async function(req, res) {

  if(!validateWeatherRequest(res, req.query)) return;

  getForecast(req.query.city)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: 'An error occured while getting the forecast',
        error: err
      })
    })
});

validateWeatherRequest = (res, query) => {
  if(query.city === undefined){
    res.status(400).send({
      message: 'No city provided for weather forecast'
    })
    return false;
  }

  // Check if city exists ?

  return true;
}

module.exports = router;
