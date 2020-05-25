const axios = require('axios')
const qs = require('querystring');
var pixabay = require("../config/config.js").pixabay;

exports.getImage = async (q) => {
    const data = {
        key: pixabay.key,
        q: q
    }

    let response = await axios.get(`${pixabay.url}/?${qs.stringify(data)}`)

    if (response.status === 200 && response.data.hits.length > 0) {
        const res = response.data.hits[0];
        return {
            image: res.webformatURL
        }
    }

    return null
}
