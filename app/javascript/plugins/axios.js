import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'api'
})
if (localStorage.token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`
}
export default axiosInstance
