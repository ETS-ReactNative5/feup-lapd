var express = require("express");
var router = express.Router();
const { getForecast } = require("../modules/openweathermap");

/* GET home page. */
router.get("/", async function(req, res) {
  // TODO: Get parameters from url
  getForecast("Porto")
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
});

module.exports = router;
