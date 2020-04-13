var express = require("express");
var router = express.Router();
const { getRestaurants } = require("../modules/zomato");

/* GET home page. */
router.get("/", async function(req, res) {
  // TODO: Get parameters from url
  getRestaurants("Porto")
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
});

module.exports = router;
