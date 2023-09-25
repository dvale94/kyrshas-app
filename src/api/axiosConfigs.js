import axios from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
  }
});

const errorHandler = (error) => {
  const statusCode = error.response?.status
  console.error(error)
  return Promise.reject(error)
}

api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error)
})

export default api;