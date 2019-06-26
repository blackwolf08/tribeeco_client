import axios from "axios";

import { BASE_API_URL } from "../constants";

const http = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "content-type": "application/json",
    "x-auth": {
      toString() {
        return localStorage.getItem("id_token");
      }
    }
  }
});

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem("id_token");
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

http.CancelToken = axios.CancelToken;

export default http;
