// 引入axios模块
import axios from 'axios'

// 引入获取token函数
import { getToken } from '@/utils/auth'

// 导入加载条
import NProgress from 'nprogress'

// 默认设置校验码
axios.defaults.headers.common['Authorization'] = getToken()
// 允许axios携带cookie
// axios.defaults.withCredentials = true

// 封装axios
const request = axios.create({
  baseURL: process.env.VUE_APP_REQUEST_URL,
  // 设置超时时间
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
  // 开启进度条
  NProgress.start()
  return config
})

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 关闭进度条
    NProgress.done()
    return response
  },
  error => {
    // 关闭进度条
    NProgress.done()
    return Promise.reject(error)
  }
)

// 导出封装axios对象
export default request
