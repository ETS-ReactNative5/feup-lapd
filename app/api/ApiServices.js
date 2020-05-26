import axios from "axios";
import qs from "qs";

// const API_URL = "http://localhost:3000"
const API_URL = "http://192.168.1.81:3000"

const getWeather = async (city, startDate, endDate) => {
  const query = {
    city: city,
    startDate: startDate,
    endDate: endDate
  }

  return await axios.get(`${API_URL}/weather?${qs.stringify(query)}`);
};

const getRestaurants = async (city, offset, sort = "", order = "") => {
  const query = {
    city: city,
    offset: offset
  }

  if (sort !== "") query.sort = sort //cost, rating or real_distance
  if (order !== "") query.order = order //asc or desc

  return await axios.get(`${API_URL}/restaurants?${qs.stringify(query)}`);
}

const getShops = async (city, offset) => {
  const query = {
    city: city,
    offset: offset
  }

  return await axios.get(`${API_URL}/shops?${qs.stringify(query)}`);
};

const getPOIs = async (city, offset, filters) => {
  const query = {
    city: city,
    offset: offset,
    filters: filters //ar&outdoor&nightlife&event
  }

  return await axios.get(`${API_URL}/pois?${qs.stringify(query)}`);
};

const getHotels = async (city, radius, ratings = "", priceRange = "", sort = "") => {
  const query = {
    city: city,
    radius: radius // 1 - 300 (one value)
  }

  if (ratings !== "") query.ratings = ratings // 1, 2, 3, 4 or 5
  if (priceRange !== "") query.priceRange = priceRange // min-max
  if (sort !== "") query.sort = sort // PRICE or DISTANCE

  return await axios.get(`${API_URL}/hotels?${qs.stringify(query)}`);
};

const getLocation = async (city) => {
  const query = {
    city: city
  }

  return await axios.get(`${API_URL}/location/city?${qs.stringify(query)}`);
}

const getLocationByCoordinates = async (lat, long) => {
  const query = {
    lat: lat,
    long: long
  }

  return await axios.get(`${API_URL}/location/latlon?${qs.stringify(query)}`);
}

const getCityPhoto = async (city) => {
  const query = {
    q: city
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
  getCityPhoto
};
