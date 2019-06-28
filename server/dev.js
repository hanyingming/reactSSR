const path = require('path')
const webpack = require('webpack')
const MemoryFS = require('memory-fs') // 内存
const ReactSSR = require('react-dom/server') // 服务器端渲染
const axios = require('axios')
const proxy = require('http-proxy-middleware') // http代理中间件
// const asyncBootstrap = require('react-async-bootstrapper')
const reactTreeWalker = require('react-tree-walker')
const { ChunkExtractor } = require('@loadable/server')

// const match = require('react-router-dom')
const { matchRoutes } = require('react-router-config')
// const route = require('../client/config/serverRouter').default

// 服务器端webpack 配置；用于动态初始化webpack
const serverConfig = require('../build/webpack.server.js')

// 通过module到处的打包数据
let serverBundle

// 获取渲染模板; 需要启动 dev:client, 即 webpack-dev-server服务
const getTemplate = (config) => {
  return new Promise((resolve, reject) => {
    axios.get(`http://${config.host}:${config.clientPort}${config.publicPath}index.html`)
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

const getLoadableStats = (config) => {
  return new Promise((resolve, reject) => {
    axios.get(`http://${config.host}:${config.clientPort}${config.publicPath}loadable-stats.json`)
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

// 预加载请求处理
const preFetchData = (routes, store, location) => {
  const branch = matchRoutes(routes, location)
  console.warn('routes:', branch)
  // const promises = branch.map(({ route, match }) => {
  //   if (route.component) {
  //     route.component.fetchData
  //       ? route.component.fetchData(store, match)
  //       : Promise.resolve(null)
  //   }
  // })
  const promises = branch.map(({ route, match }) => {
    console.warn('route:...', route)
    console.warn('route:...', route.component)
    return route.fetchData ? route.fetchData(store, match) : Promise.resolve(null)
  })
  console.warn('promises', promises)
  return Promise.all(promises)
}

// 搜集所有请求
const asyncFetchData = (app) => {
  // let promises = []
  // const visitor = (element, instance) => {
  //   // console.warn('element:', element)
  //   console.warn('instance:', instance)
  //   if (instance && instance.fetchData && typeof instance.fetchData === 'function') {
  //     promises.push(instance.fetchData())
  //   }
  // }
  // return reactTreeWalker(app, visitor).then(() => {
  //   return Promise.all(promises)
  // }).catch(err => {
  //   console.warn('err:', err)
  //   return Promise.all(promises)
  // })
  // const matchedRoutes = matchRoutes(route, url)
  // console.warn('matchedRoutes', matchedRoutes)
  let promises = []
  // matchedRoutes.forEach(item => {
  //   if (item.route.fetchData) {
  //     const promise = new Promise(resolve => {
  //       item.route.fetchData(store).then(resolve).catch(resolve)
  //     })
  //     promises.push(promise)
  //   }
  // })
  // console.warn('promises', promises)

  // match({routes: serverBundle, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
  // })
  return Promise.all(promises)
}

const Module = module.constructor
// 动态创建webpack
const serverCompiler = webpack(serverConfig)
// 将打包文件输出到内存中
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs
// 监听webpack 打包过程
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  // 打印error、warning 日志
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

  // 读取最终打包文件的内容
  const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename)
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')

  // 创建Module对象 将数据动态挂在到模块上
  const m = new Module()
  m._compile(bundle, 'server.js')
  serverBundle = m.exports.default
  serverBundle.routes = m.exports.routes
  serverBundle.stores = m.exports.stores
  console.warn('serverBundle:', serverBundle)
})

module.exports = function (app, config) {
  // 配置静态文件访问；通过代理中间件重定向访问地址
  app.use('/public', proxy({
    target: `http://${config.host}:${config.clientPort}`
  }))

  app.get('*', function (req, res) {
    console.warn(333)
    if (serverBundle) {
      getTemplate(config).then(template => {
        const app = serverBundle(serverBundle.stores, {}, req.url)
        // const appString = ReactSSR.renderToString(app)
        // res.send(template.replace('<!-- app -->', appString))

        // const extractor = new ChunkExtractor(statsFile)
        // console.warn('extractor:', extractor)

        preFetchData(serverBundle.routes, serverBundle.stores, req.url)
          .then(() => {
            const appString = ReactSSR.renderToString(app)
            res.send(template.replace('<!-- app -->', appString))
          })
          .catch((err) => {
            console.log(err)
          })
        // 获取store
        // const store = require('../client/store').default
        // const routerContext = {}

        // console.warn('serverBundle', serverBundle)
        // const app = serverBundle({}, req.url)
        // asyncBootstrap().then(() => {

        // })
        // console.warn('app:', app)
        // 监听处理路由302重定向问题
        // if (routerContext.url) { // 重定向
        //   res.status(302).setHeader('Location', routerContext.url)
        //   res.end()
        //   return
        // }
        // 在渲染组建前卡一下，等待所有请求结束

        // getLoadableState(app).then(loadableState => {
        //   const appString = ReactSSR.renderToString(app)
        //   res.send(template.replace('<!-- app -->', appString))
        // })

        // asyncFetchData(app).then(() => {
        //   // 获取渲染模板后整合渲染数据，返回给客户端
        //   const appString = ReactSSR.renderToString(app)
        //   res.send(template.replace('<!-- app -->', appString))
        // })

        // console.warn('match:', matchPath)
        // matchPath({ routes: serverBundle.routes, location: req.url }, (err, redirectLocation, renderProps) => {
        //   console.warn('err', err)
        //   const { params, components, location } = renderProps
        //   const taskList = []
        //   components.forEach((component) => {
        //     component && component.fetchData && taskList.push(component.fetchData())
        //   })
        //   Promise.all(taskList).then((data) => { // 调用renderToString
        //     const appString = ReactSSR.renderToString(app)
        //     res.send(template.replace('<!-- app -->', appString))
        //   })
        // })

        // asyncFetchData(app).then(() => {
        //   // 获取渲染模板后整合渲染数据，返回给客户端
        //   const appString = ReactSSR.renderToString(app)
        //   res.send(template.replace('<!-- app -->', appString))
        // })
      })
    } else {
      res.end()
    }
  })
}
