var express = require("express");
var router = express.Router();
const { getHotels } = require("../modules/amadeus");

/* GET hotels page. */
router.get("/", async function(req, res) {
  // TODO: Get parameters from url
  getHotels("OPO")
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
});

module.exports = router;
