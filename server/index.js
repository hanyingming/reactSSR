// 服务器端支持 import export
require('@babel/register')
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const devServer = require('./dev')
const prodServer = require('./prod')

const isDev = process.env.NODE_ENV === 'development'
const config = {
  host: '127.0.0.1',
  port: 3000,
  clientPort: 8000,
  publicPath: '/public/'
}

const app = express()

// 配置网站icon图标
app.use(favicon(path.join(__dirname, '../', 'favicon.ico')))

if (!isDev) { // 生产环境
  prodServer(app)
} else { // 开发环境
  devServer(app, config)
}

app.listen(config.port, function () {
  console.log(`server is listening on ${config.port}`)
})
