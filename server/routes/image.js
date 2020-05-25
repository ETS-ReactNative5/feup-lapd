var express = require("express");
var router = express.Router();
const { getImage } = require("../modules/pixabay");

router.get("/", async function (req, res) {
    if (!validateRequest(res, req.query)) return;

    getImage(req.query.q)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: 'An error occured while getting image',
                error: err
            })
        })
});

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