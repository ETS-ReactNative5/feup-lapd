var express = require("express");
var router = express.Router();
const { getLocationLatLon } = require("../modules/geodb");
const { getLocationCity } = require("../modules/openweathermap");

router.get("/latlon", async function (req, res) {
    if (!validateLatLonRequest(res, req.query)) return;

    getLocationLatLon(parseFloat(req.query.lat), parseFloat(req.query.lon))
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: 'An error occured while getting location from lat and lon',
                error: err
            })
        })
});

validateLatLonRequest = (res, query) => {
    if (query.lat === undefined || query.lon === undefined) {
        res.status(400).send({
            message: 'No "lat" or "lon" provided'
        })
        return false;
    }
    return true;
}

router.get("/city", async function (req, res) {
    if (!validateCityRequest(res, req.query)) return;

    getLocationCity(req.query.city)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: 'An error occured while getting location',
                error: err
            })
        })
});

validateCityRequest = (res, query) => {
    if (query.city === undefined) {
        res.status(400).send({
            message: 'No "city" provided'
        })
        return false;
    }
    return true;
}

module.exports = router;