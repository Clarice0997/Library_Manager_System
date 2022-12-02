// 导入封装axios对象
import request from '@/utils/request.js'

// 封装注册API
export const registerAPI = function (username, password) {
  return request.post('apis/register', {
    data: {
      username,
      password
    }
  })
}
