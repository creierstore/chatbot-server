const axios = require("axios");
require("dotenv").config();

BASE_URL = process.env.URL_BASE;
axios.defaults.baseURL = BASE_URL;


const axiosInstance = axios.create({
  baseUrl: BASE_URL,
  timeout: 1000,
});


const getProductos = async () => {
  return await axiosInstance.get("/productos");
};
