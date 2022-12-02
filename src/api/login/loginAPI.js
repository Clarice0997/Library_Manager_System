// 导入封装axios对象
import request from '@/utils/request.js'

// 封装登录API
export const loginAPI = function (username, password) {
  return request.post('apis/login', {
    data: {
      username,
      password
    }
  })
}
