import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入处理Cookie模块
import VueCookies from 'vue-cookies'

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
router.beforeEach((to, from, next) => {
  // 判断当前访问网址是不是路由守卫网址
  // 是则校验cookie 否则放行
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (VueCookies.get('loginCookie')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
