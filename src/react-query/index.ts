import Axios from "axios";

const baseURL = "http://212.64.215.163:8000";

export const axios = Axios.create({
  baseURL,
});

axios.interceptors.request.use(
  async function (config) {
    const access_token = localStorage.getItem("access_token");
    config.headers["Authorization"] = `Bearer ${access_token}`;
    //config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
