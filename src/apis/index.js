import axios from 'axios'
import { LocalStorage } from '../constants/localStorage.constant'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVER}`,
  headers: {
    'Content-Type': 'Application/json',
    'ngrok-skip-browser-warning': '69420',
  },
})

api.interceptors.request.use((config) => {
  const accessToken = JSON.parse(localStorage.getItem(LocalStorage.auth))?.token
  config.headers.Authorization = `Bearer  ${accessToken}`
  return config
}, Promise.reject)

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.code === 401) {
      const navigate = useNavigate()
      toast.error('Phiên đăng nhập đã hết hạn')
      navigate('/login')
      localStorage.removeItem(LocalStorage.auth)
    }
    return Promise.reject(error)
  },
)
const apiDefault = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVER}`,
  headers: {
    'Content-Type': 'Application/json',
    'ngrok-skip-browser-warning': '69420',
  },
})

apiDefault.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(localStorage.getItem(LocalStorage.auth))?.token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    } else {
      console.log('No access token found')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export { apiDefault, api }
