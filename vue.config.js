const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {    //配置代理服务器解决跨域访问问题
    proxy: {
      '/baidubaike': {
        target: 'https://baike.baidu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/baidubaike': '/'
        }
      },
      '/baidumap': {
        target: 'https://api.map.baidu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/baidumap': '/'
        }
      },
      '/maitanbang': {
        target: 'https://www.maitanbang.com',
        changeOrigin: true,
        pathRewrite: {
          '^/maitanbang': '/'
        }
      },
      '/myweather': {
        target: 'https://geoapi.qweather.com',
        changeOrigin: true,
        pathRewrite: {
          '^/myweather': '/'
        }
      },
      '/myairquality': {
        target: 'https://devapi.qweather.com',
        changeOrigin: true,
        pathRewrite: {
          '^/myairquality': '/'
        }
      },
      '/tianapi': {
        target: 'http://api.tianapi.com',
        changeOrigin: true,
        pathRewrite: {
          '^/tianapi': '/'
        }
      },
      '/apispace': {
        target: 'https://eolink.o.apispace.com',
        changeOrigin: true,
        pathRewrite: {
          '^/apispace': '/'
        }
      },
      '/apijuhe': {
        target: 'http://apis.juhe.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/apijuhe': '/'
        }
      },
    }
  }
})
