var express = require("express");
var router = express.Router();
const { getLocationCity } = require("../modules/openweathermap");

/* GET location page. */
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

// Validate get location request
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
