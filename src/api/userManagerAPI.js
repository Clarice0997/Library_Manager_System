// 导入封装axios对象
import request from '@/utils/request.js'

/**
 * 获取用户信息API
 * @returns
 */
export const getUsersInfo = function (pageNumber, pageSize) {
  return request.get('apis/userManager/getInfo', { params: { pageNumber, pageSize } })
}
