import axios from "axios";
import * as qs from "qs";

// Port for the backend API
const PORT = "8080";

// Bbase URL for API requests
const BASE_URL = `http://localhost:${PORT}/api/v1`;

// Get the token from local storage
const token = localStorage.getItem("token");

// Axios instance with custom configurations
const axiosClient = axios.create({
  baseURL: BASE_URL,

  // Default headers for all HTTP requests
  headers: {
    "Content-Type": "application/json", // Specify that the payload is JSON
    Authorization: `Bearer ${token}`,
  },

  // How query parameters are serialized for GET requests
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat", encode: false });
  },
});

export default axiosClient;
