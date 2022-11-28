import axios from 'axios'

// 允许axios携带cookie
axios.defaults.withCredentials = true

// 封装axios
const request = axios.create({
  baseURL: 'http://localhost:8002/'
})

// 导出封装axios对象
export default request
