import axios from 'axios'

const api = axios.create({
    baseURL:  process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000
})

api.interceptors.request.use((config) => {
    config.params = {
      ...config.params,
      appid: process.env.NEXT_PUBLIC_API_KEY,
      exclude: 'hourly,daily'
    }
    return config
  })
  

export default api