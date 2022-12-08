// 导入封装axios对象
import request from '@/utils/request.js'

// 封装登录API
export const loginAPI = function (username, password) {
  return request.post('apis/user/login', {
    data: {
      username,
      password
    }
  })
}

// 封装注册API
export const registerAPI = function (username, password, nickname) {
  return request.post('apis/user/register', {
    data: {
      username,
      password,
      nickname
    }
  })
}

// 封装获取信息API
export const userProfileAPI = function () {
  return request.get('apis/user/profile')
}
