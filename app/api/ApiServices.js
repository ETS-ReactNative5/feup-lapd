import axios from "axios";
import qs from "qs";

// DATABASE SERVICES

const API_URL = "http://localhost:3000"

const getWeather = async (city) => {
  const query = {
    city: city
  }

  return await axios.get(`${API_URL}/weather?${qs.stringify(query)}`);
};


export const ApiServices = {
  getWeather
};
