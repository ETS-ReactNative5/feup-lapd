const axios = require('axios')
const qs = require('querystring');
var serpwow = require("../config/config.js").serpwow;
var dataStorage = require("../utils/data_storage");

// Get filename of request saved in local storage
const getFilename = (place_image) => {
  	const data = {
  		place_image: place_image
  	}

  	return `images?${qs.stringify(data)}`
}

// Make request to SerpWow API and return response
exports.getSerpImage = async (q) => {
	filename = getFilename(q)
	storedResponse = dataStorage.getItem(filename)

	if(storedResponse !== null) return JSON.parse(storedResponse)

    const data = {
        api_key: serpwow.api_key,
        q: q,
        search_type: serpwow.search_type
    }

    response = await axios.get(`${serpwow.url}?${qs.stringify(data)}`)

    dataStorage.setItem(filename, JSON.stringify(response.data))
    return response.data
}
