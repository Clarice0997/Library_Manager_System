// 导入封装axios对象
import request from '@/utils/request.js'

// 封装登录API
export const loginAPI = function (_account, _password) {
  return request.get('apis/login', {
    params: {
      _account,
      _password
    }
  })
}
