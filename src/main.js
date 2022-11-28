// 重置css样式
import '@/assets/css/reset.css'
// 整合elementUI
import './plugins/element.js'
// 导入Vue模块
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
