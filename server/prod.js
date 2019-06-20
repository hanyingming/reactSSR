const fs = require('fs')
const path = require('path')
const express = require('express')

module.exports = function (app) {
  // 配置静态文件目录
  app.use('/public', express.static(path.join(__dirname, '../dist')))

  const ReactSSR = require('react-dom/server')

  // 引入服务器端渲染入口文件
  const serverEntry = require('../dist/server.js').default
  // 引入网页基础结构文件
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

  // 渲染服务器端入口文件
  app.get('*', function (req, res) {
    // 读入服务器端入口文件数据
    const appString = ReactSSR.renderToString(serverEntry)
    // 渲染服务器端数据到网页文件后，返回给客户端
    res.send(template.replace('<!-- app -->', appString))
  })
}
