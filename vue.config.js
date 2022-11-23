const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api/*": {
        target: "http://[::1]:42069/",
        ws: true,
        changeOrigin: true,
        secure: false
      }
    }
  },
  productionSourceMap: false
})
