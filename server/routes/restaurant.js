var express = require("express");
var router = express.Router();
const { getRestaurants } = require("../modules/zomato");

/* GET restaurants page. */
router.get("/", async function(req, res) {

  if(!validateRestaurantsRequest(res, req.query)) return;

  getRestaurants(req.query.city, parseInt(req.query.offset), req.query.sort, req.query.order)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'An error occured while searching for restaurants',
        error: err
      })
    })
});

validateRestaurantsRequest = (res, query) => {
  if(query.city === undefined || query.offset === undefined){
    res.status(400).send({
      message: 'No city and/or offset provided while searching for restaurants'
    })
    return false;
  }

  // Check if city exists ?

  if(!/^\d+$/.test(query.offset)){
    res.status(400).send({
      message: 'Invalid offset parameter provided while searching for restaurants'
    })
    return false;
  }

  if(query.sort !== undefined && query.sort !== "cost" && query.sort !== "rating" && query.sort !== "real_distance"){
    res.status(400).send({
      message: 'Invalid sort parameter provided while searching for restaurants'
    })
    return false;
  }

  if(query.order !== undefined && query.order !== "asc" && query.order !== "desc"){
    res.status(400).send({
      message: 'Invalid order parameter provided while searching for restaurants'
    })
    return false;
  }

  return true;
}

module.exports = router;
