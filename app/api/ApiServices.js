import axios from "axios";
import qs from "qs";

const API_URL = "http://localhost:3000"

const getWeather = async (city) => {
  const query = {
    city: city
  }

  return await axios.get(`${API_URL}/weather?${qs.stringify(query)}`);
};

const getRestaurants = async (city, offset, sort = "", order = "") => {
  const query = {
    city: city,
    offset: offset
  }

  if(sort !== "") query.sort = sort
  if(order !== "") query.order = order

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
    filters: filters
  }

  return await axios.get(`${API_URL}/pois?${qs.stringify(query)}`);
};

const getHotels = async (city, radius, ratings = "", priceRange = "", sort = "") => {
  const query = {
    city: city,
    radius: radius
  }

  if(ratings !== "") query.ratings = ratings
  if(priceRange !== "") query.priceRange = priceRange
  if(sort !== "") query.sort = sort

  return await axios.get(`${API_URL}/hotels?${qs.stringify(query)}`);
};

export const ApiServices = {
  getWeather,
  getRestaurants,
  getShops,
  getPOIs,
  getHotels
};
