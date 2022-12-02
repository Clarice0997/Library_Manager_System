// 引入axios模块
import axios from 'axios'
// 引入获取token函数
import { getToken } from '@/utils/auth'
// 默认设置校验码
axios.defaults.headers.common['Authorization'] = getToken()
// 允许axios携带cookie
// axios.defaults.withCredentials = true

// 封装axios
const request = axios.create({
  baseURL: process.env.VUE_APP_REQUEST_URL
})

// 导出封装axios对象
export default request
