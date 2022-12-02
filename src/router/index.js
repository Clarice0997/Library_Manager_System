import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入获取token函数
import { getToken } from '@/utils/auth'

// 配置路由跳转
const routerPush = VueRouter.prototype.push

VueRouter.prototype.push = function (location) {
  return routerPush.call(this, location).catch(err => {})
}

// 使用路由模块
Vue.use(VueRouter)

const routes = [
  // 默认路由
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: () => import(/* webpackChunkName: "main" */ '@/views/home/HomeView.vue'),
    meta: {
      // 需要登录
      requireAuth: true
    },
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/Home.vue')
      },
      {
        path: 'userManager',
        component: () => import(/* webpackChunkName: "userManager" */ '@/views/userManager/index.vue')
      },
      {
        path: 'bookManager',
        component: () => import(/* webpackChunkName: "bookManager" */ '@/views/bookManager/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/LoginView.vue'),
    redirect: '/login/login',
    children: [
      {
        path: 'login',
        component: () => import(/* webpackChunkName: "loginComponent" */ '@/components/login/Login.vue')
      },
      {
        path: 'register',
        component: () => import(/* webpackChunkName: "loginComponent" */ '@/components/login/Register.vue')
      }
    ]
  },
  // 访问不存在的路由重定向
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 判断当前访问网址是不是路由守卫网址
  // 是则校验cookie 否则放行
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (await getToken()) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
