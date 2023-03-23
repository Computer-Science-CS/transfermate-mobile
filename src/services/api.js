import axios from 'axios'
import constants from './constants'
import { store } from '../redux/store'

const baseURL = constants.API_URL

let axiosApi = axios.create({
  baseURL
}, 20000)

axiosApi.interceptors.request.use(
  async config => {
    const token = store.getState().login.accessToken
    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosApi