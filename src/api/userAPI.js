// 导入封装axios对象
import request from '@/utils/request.js'

/**
 * 登录API
 * @param {*} username
 * @param {*} password
 * @returns
 */
export const loginAPI = function (username, password) {
  return request.post('apis/user/login', {
    data: {
      username,
      password
    }
  })
}

/**
 * 注册API
 * @param {*} username
 * @param {*} password
 * @param {*} nickname
 * @returns
 */
export const registerAPI = function (username, password, nickname) {
  return request.post('apis/user/register', {
    data: {
      username,
      password,
      nickname
    }
  })
}

/**
 * 获取个人信息API
 * @returns
 */
export const userProfileAPI = function () {
  return request.get('apis/user/profile')
}
