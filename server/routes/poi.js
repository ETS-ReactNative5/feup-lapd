var express = require("express");
var router = express.Router();
const { getPOIs } = require("../modules/foursquare");

/* GET home page. */
router.get("/", async function(req, res) {
  // TODO: Get parameters from url
  getPOIs("Porto")
    .then(({art, outdoors, nightlife, events}) => {
      res.send({
        art: art.data.response.venues,
        outdoors: outdoors.data.response.venues,
        nightlife: nightlife.data.response.venues,
        events: events.data.response.venues
      })
    })
    .catch((err) => {
      console.log(err)
    })
});

module.exports = router;
