var express = require("express");
var router = express.Router();

router.get("/", async function(req, res) {
  res.send("TripLap Server API");
});

module.exports = router;
