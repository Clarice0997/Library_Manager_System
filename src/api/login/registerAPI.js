// 导入封装axios对象
import request from '@/utils/request.js'

// 封装注册API
export const registerAPI = function (_account, _password) {
  return request.get('apis/register', {
    params: {
      _account,
      _password
    }
  })
}
