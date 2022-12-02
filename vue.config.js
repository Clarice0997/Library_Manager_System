const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: process.env.VUE_APP_PORT,
    host: 'localhost',
    open: true,
    // 跨域需要保持为空
    proxy: {
      '/apis': {
        target: process.env.VUE_APP_REQUEST_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/apis': ''
        }
      }
    }
  }
})
