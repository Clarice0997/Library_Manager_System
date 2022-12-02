// cookie处理工具类
// 获取校验token
export function getToken() {
  return $cookies.get('Access-Token')
}

// 保存校验token
export function setToken(token) {
  $cookies.set('Access-Token', token, { expires: '7D' })
}

// 删除校验token
export function deleteToken() {
  $cookies.remove('Access-Token')
}
