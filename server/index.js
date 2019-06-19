const express = require('express')
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

if (!isDev) { // 生产环境
  prodServer(app)
} else { // 开发环境
  devServer(app, config)
}


// 监听3000端口
app.listen(config.port, function() {
  console.log("server is listening on 3000")
})
