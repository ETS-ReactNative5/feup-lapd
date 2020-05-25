const axios = require('axios')
const qs = require('querystring');
var geodb = require("../config/config.js").geodb;
var { convertISO6709 } = require("../utils/utils");

exports.getLocationLatLon = async (lat, lon, config = {}) => {
    const data = {
        limit: config.limit || 5,
        offset: config.offset || 0,
        radius: config.radius || 100
    }

    const latlon = convertISO6709(lat, lon);

    let response = await axios.get(`${geodb.url}/locations/${latlon}/nearbyCities?${qs.stringify(data)}`)

    if (response.status === 200) {
        const res = response.data.data[0];
        return {
            city: res.name,
            country: res.country
        }
    }

    return null
}
