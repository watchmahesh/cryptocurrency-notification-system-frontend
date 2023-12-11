import axios from 'axios';
const serverapibaseurl = process.env.SERVER_API_BASE_URL;
const api = axios.create({
  baseURL: serverapibaseurl || 'http://localhost:8003/api/v1', // Replace with your API server endpoint
});

export default api;
