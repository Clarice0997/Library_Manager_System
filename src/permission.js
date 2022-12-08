// 导入
import router from './router'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置Nprogress项 关闭右上角螺旋加载提示
NProgress.configure({ showSpinner: false })

// 全局路由前置
router.beforeEach(async (to, from, next) => {
  // 启动NProgress加载
  NProgress.start()

  // 判断是否存在Token
  let hasToken = getToken()

  if (to.matched.some(record => record.meta.requireAuth)) {
    if (hasToken) {
      // 存在Token 路由登录页 直接跳转主页
      if (to.path === '/login') {
        next({ path: '/main/home' })
        NProgress.done()
      } else {
        next()
        NProgress.done()
      }
    }
    // 不存在Token跳转登录页
    else {
      next('/login')
      NProgress.done()
    }
  }
  // 如果路由地址不用校验则放行
  else {
    next()
    NProgress.done()
  }
})

// 全局路由后置
router.afterEach(() => {
  // 停止NProgress加载
  NProgress.done()
})
