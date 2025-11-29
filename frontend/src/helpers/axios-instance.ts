import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_PATH;

const axiosInstance = axios.create();
console.log('API Base URL:', BASE_URL); // Debug log
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
