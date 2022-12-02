// 导入封装axios对象
import request from '@/utils/request.js'

// 封装登录API
export const userProfileAPI = function () {
  return request.get('apis/profile')
}
