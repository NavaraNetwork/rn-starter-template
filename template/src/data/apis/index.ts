import axios from 'axios';

const API_URL = '';
const API = axios.create({baseURL: API_URL});

API.interceptors.response.use(
  async response => {
    return response.data;
  },
  error => {
    if (error.code === 'ERR_NETWORK') {
      return;
    }
    return Promise.reject(error);
  },
);

export default API;
