const fs = require('fs')
const path = require('path')
const express = require('express')
const { matchRoutes } = require('react-router-config')

// 预加载请求处理
const preFetchData = (routes, store, location) => {
  const matchedRoutes = matchRoutes(routes, location)
  // const promises = matchedRoutes.map(({ route, match }) => {
  //   return route.component && route.component.fetchData
  //     ? route.component.fetchData(store, match)
  //     : Promise.resolve(null)
  // })
  const promises = matchedRoutes.map(({ route, match }) => {
    return route.fetchData
      ? route.fetchData(store, match)
      : Promise.resolve(null)
  })
  console.warn('promises', promises)
  return Promise.all(promises)
}

module.exports = function (app) {
  // 配置静态文件目录
  app.use('/public', express.static(path.join(__dirname, '../dist')))

  const ReactSSR = require('react-dom/server')

  // 引入服务器端渲染入口文件
  const serverEntry = require('../dist/server.js')
  // 引入网页基础结构文件
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

  // 渲染服务器端入口文件
  app.get('*', function (req, res) {
    const routerContext = {}
    preFetchData(serverEntry.routes, serverEntry.stores, req.url)
      .then(() => {
        console.warn('preFetchData --> after')
        const app = serverEntry.default(serverEntry.stores, routerContext, req.url)
        // 读入服务器端入口文件数据
        const appString = ReactSSR.renderToString(app)
        // 渲染服务器端数据到网页文件后，返回给客户端
        const initialState = `<script> window.context={ INITIAL_STATE: ${JSON.stringify(serverEntry.stores.getState())}} </script>`
        res.send(template.replace('<!-- app -->', appString).replace('<!-- initial-state -->', initialState))
      })
      .catch((err) => {
        res.send(template.replace('<!-- app -->', JSON.stringify(err)))
        res.end()
      })
  })
}
