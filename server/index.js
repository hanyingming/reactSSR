// 服务器端支持 import export
require('@babel/register')
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const Loadable = require('react-loadable')

const isDev = process.env.NODE_ENV === 'development'
const config = {
  host: '127.0.0.1',
  port: 3000,
  clientPort: 7000,
  publicPath: '/public/'
}

const app = express()

// 配置网站icon图标
app.use(favicon(path.join(__dirname, '../', 'favicon.ico')))

if (!isDev) { // 生产环境
  const prodServer = require('./prod')
  prodServer(app)
} else { // 开发环境
  const devServer = require('./dev')
  devServer(app, config)
}

Loadable.preloadAll().then(() => {
  app.listen(config.port, function () {
    console.log(`server is listening on ${config.port}`)
  })
})
