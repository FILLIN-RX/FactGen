// src/api.js
import axios from 'axios'

const axiosapi = axios.create({
  baseURL: 'http://localhost:4000/', // ← adresse de ton serveur Express
  timeout: 5000,
})

export default axiosapi
