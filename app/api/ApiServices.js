import axios from "axios";
import qs from "qs";

const API_URL = "http://localhost:3000"

// Makes an API request to fetch weather information
const getWeather = async (city, startDate, endDate) => {
  const query = {
    city: city,
    startDate: startDate,
    endDate: endDate
  }

  return await axios.get(`${API_URL}/weather?${qs.stringify(query)}`);
};

// Makes an API request to fetch restaurants information
const getRestaurants = async (city, offset, sort = "", order = "") => {
  const query = {
    city: city,
    offset: offset
  }

  if (sort !== "") query.sort = sort //cost, rating or real_distance
  if (order !== "") query.order = order //asc or desc

  return await axios.get(`${API_URL}/restaurants?${qs.stringify(query)}`);
}

// Makes an API request to fetch shops information
const getShops = async (city, offset) => {
  const query = {
    city: city,
    offset: offset
  }

  return await axios.get(`${API_URL}/shops?${qs.stringify(query)}`);
};

// Makes an API request to fetch points of interest information
const getPOIs = async (city, offset, filters) => {
  const query = {
    city: city,
    offset: offset,
    filters: filters      //art&outdoor&nightlife&event
  }

  return await axios.get(`${API_URL}/pois?${qs.stringify(query)}`);
};

// Makes an API request to fetch hotels information
const getHotels = async (city, radius, ratings = "", priceRange = "", sort = "") => {
  const query = {
    city: city,
    radius: radius        // 1 - 300 (one value)
  }

  if (ratings !== "") query.ratings = ratings           // 1, 2, 3, 4 or 5
  if (priceRange !== "") query.priceRange = priceRange  // min-max
  if (sort !== "") query.sort = sort                    // PRICE or DISTANCE

  return await axios.get(`${API_URL}/hotels?${qs.stringify(query)}`);
};

// Makes an API request to fetch location by city name information
const getLocation = async (city) => {
  const query = {
    city: city
  }

  return await axios.get(`${API_URL}/location/city?${qs.stringify(query)}`);
}

// Makes an API request to fetch location by coordinates information
const getLocationByCoordinates = async (lat, long) => {
  const query = {
    lat: lat,
    long: long
  }

  return await axios.get(`${API_URL}/location/latlon?${qs.stringify(query)}`);
}

// Makes an API request to fetch a image by providing a query information
const getImage = async (q) => {
  const query = {
    q: q
  }

  return await axios.get(`${API_URL}/image?${qs.stringify(query)}`);
}

export const ApiServices = {
  getWeather,
  getRestaurants,
  getShops,
  getPOIs,
  getHotels,
  getLocation,
  getLocationByCoordinates,
  getImage
};
