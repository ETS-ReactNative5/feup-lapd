var express = require("express");
var router = express.Router();
const { getShops } = require("../modules/foursquare");

/* GET home page. */
router.get("/", async function(req, res) {
  // TODO: Get parameters from url
  getShops("Porto")
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
});

module.exports = router;
