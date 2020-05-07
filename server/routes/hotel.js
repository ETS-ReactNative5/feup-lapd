var express = require("express");
var router = express.Router();
const { getHotels } = require("../modules/amadeus");
const { getLatLon } = require("../modules/mapquest");

/* GET hotels page. */
router.get("/", async function(req, res) {

  if(!validateHotelsRequest(res, req.query)) return;

  sort = req.query.sort !== undefined ? (req.query.sort == 'price' ? 'PRICE' : 'DISTANCE' ) : undefined

  latLng = await getLatLon(req.query.city)
  if(latLng == null){
    res.status(400).send({
      message: 'City not found while searching for hotels'
    })
    return
  }

  getHotels(latLng.latitude, latLng.longitude, parseInt(req.query.radius), sort, parseInt(req.query.ratings), req.query.priceRange)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'An error occured while searching for hotels',
        error: err
      })
    })
});

validateHotelsRequest = (res, query) => {
  if(query.city === undefined || query.radius === undefined){
    res.status(400).send({
      message: 'No city and/or radius provided while searching for hotels'
    })
    return false;
  }

  // Check if city exists ?

  if(!/^\d+$/.test(query.radius)){
    res.status(400).send({
      message: 'Invalid radius parameter provided while searching for hotels'
    })
    return false;
  }

  if(!(query.radius >= 0 && query.radius <=300)){
    res.status(400).send({
      message: 'Radius parameter needs to be between 0 and 300 km'
    })
    return false;
  }

  if(query.sort !== undefined && query.sort !== "price" && query.sort !== "distance"){
    res.status(400).send({
      message: 'Invalid sort parameter provided while searching for hotels. It is only possible to sort by price or distance'
    })
    return false;
  }

  if(query.ratings !== undefined && (!/^\d+$/.test(query.ratings) || !(query.ratings >= 1 && query.ratings <= 5))){
    res.status(400).send({
      message: 'Invalid ratings parameter provided while searching for hotels. The ratings can only be between 1 and 5, inclusive'
    })
    return false;
  }

  if(query.priceRange !== undefined && !/^\d+-\d+$/.test(query.priceRange)){
    res.status(400).send({
      message: 'Invalid priceRange parameter provided while searching for hotels. The priceRange should be in the format MIN_PRICE-MAX_PRICE'
    })
    return false;
  }

  if(query.priceRange !== undefined){
    prices = query.priceRange.split("-")
    min = prices[0]
    max = prices[1]

    if(max < min){
      res.status(400).send({
        message: 'Invalid priceRange parameter provided while searching for hotels. The max price should not be lower than min price'
      })
      return false;
    }

    if(min < 0){
      res.status(400).send({
        message: 'Invalid priceRange parameter provided while searching for hotels. Invalid min price provided'
      })
      return false;
    }

    if(max < 1){
      res.status(400).send({
        message: 'Invalid priceRange parameter provided while searching for hotels. Invalid max price provided'
      })
      return false;
    }
  }

  return true;
}

module.exports = router;
