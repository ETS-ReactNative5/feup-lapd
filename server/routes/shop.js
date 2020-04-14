var express = require("express");
var router = express.Router();
const { getShops } = require("../modules/foursquare");

/* GET shops page. */
router.get("/", async function(req, res) {

  if(!validateShopsRequest(res, req.query)) return;

  getShops(req.query.city, parseInt(req.query.offset))
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'An error occured while searching for shops',
        error: err
      })
    })
});

validateShopsRequest = (res, query) => {
  if(query.city === undefined || query.offset === undefined){
    res.status(400).send({
      message: 'No city and/or offset provided while searching for shops'
    })
    return false;
  }

  // Check if city exists ?

  if(!/^\d+$/.test(query.offset)){
    res.status(400).send({
      message: 'Invalid offset parameter provided while searching for shops'
    })
    return false;
  }

  if(parseInt(query.offset) >= 50){
    res.status(400).send({
      message: 'Invalid offset parameter provided while searching for shops, the offset value cannot be higher or equal to 50'
    })
    return false;
  }

  return true;
}


module.exports = router;
