var fs = require('fs')
var path = require('path')
var express = require('express')
var ReactSSR = require('react-dom/server')
// 引入服务器端渲染入口文件
var serverEntry = require('../dist/server.js').default
// 引入网页基础结构文件
var template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
var app = express()

// 配置静态文件目录
app.use('/public', express.static(path.join(__dirname, '../dist')))

// 渲染服务器端入口文件
app.get('*', function(req, res) {
  // 读入服务器端入口文件数据
  const appString = ReactSSR.renderToString(serverEntry)
  // 渲染服务器端数据到网页文件后，返回给客户端
  res.send(template.replace("<app></app>", appString))
})

// 监听3000端口
app.listen(3000, function() {
  console.log("server is listening on 3000")
})
