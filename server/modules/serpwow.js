const axios = require('axios')
const qs = require('querystring');
var serpwow = require("../config/config.js").serpwow;

exports.getSerpImage = async (q) => {
    const data = {
        api_key: serpwow.api_key,
        q: q,
        search_type: serpwow.search_type
    }

    return await axios.get(`${serpwow.url}?${qs.stringify(data)}`)
}
