var express = require("express");
var router = express.Router();
const { getSerpImage } = require("../modules/serpwow");

/* GET image page. */
router.get("/", async function (req, res) {
    if (!validateRequest(res, req.query)) return;

    getSerpImage(req.query.q)
        .then((response) => {
            res.send(response.image_results);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: 'An error occured while getting image',
                error: err
            })
        })
});

// Validate get images request
validateRequest = (res, query) => {
    if (query.q === undefined) {
        res.status(400).send({
            message: 'No "q" provided'
        })
        return false;
    }
    return true;
}

module.exports = router;
