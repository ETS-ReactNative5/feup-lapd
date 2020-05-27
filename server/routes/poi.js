var express = require("express");
var router = express.Router();
const { getPOIs } = require("../modules/foursquare");

/* GET POIs page. */
router.get("/", async function(req, res) {

  if(!validatePOIsRequest(res, req.query)) return;

  getPOIs(req.query.city, parseInt(req.query.offset), req.query.filters)
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      console.log(err)
    })
});

// Validate get points of interest request
validatePOIsRequest = (res, query) => {
  if(query.city === undefined || query.offset === undefined){
    res.status(400).send({
      message: 'No city and/or offset provided while searching for POIs'
    })
    return false;
  }

  if(!/^\d+$/.test(query.offset)){
    res.status(400).send({
      message: 'Invalid offset parameter provided while searching for POIs'
    })
    return false;
  }

  if(parseInt(query.offset) >= 50){
    res.status(400).send({
      message: 'Invalid offset parameter provided while searching for POIs, the offset value cannot be higher or equal to 50'
    })
    return false;
  }

  if(query.filters !== undefined){
    let filters = query.filters.split('&');

    filters.forEach(filter => {
      if(filter !== "art" && filter !== "outdoor" && filter !== "nightlife" && filter !== "event"){
        res.status(400).send({
          message: 'Invalid filter parameter provided while searching for POIs. The only available filters are "art", "outdoor", "nightlife" and "event", separe them with "&"'
        })
        return false;
      }
    });
  }

  return true;
}

module.exports = router;
