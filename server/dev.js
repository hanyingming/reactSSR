const path = require('path')
const fs = require('fs')
const ora = require('ora')
const webpack = require('webpack')
const MemoryFS = require('memory-fs') // 内存
const ReactSSR = require('react-dom/server') // 服务器端渲染
const axios = require('axios')
const proxy = require('http-proxy-middleware') // http代理中间件
const { matchRoutes } = require('react-router-config')
const Loadable = require('react-loadable')
// const asyncBootstrap = require('react-async-bootstrapper')
const { init } = require('@rematch/core')
const { getBundles } = require('react-loadable/webpack')

// 服务器端webpack 配置；用于动态初始化webpack
const serverConfig = require('../build/webpack.server.js')

const spinner = ora('building for SSR...\n')
spinner.start()

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

const getReactLoadableJson = (config) => {
  return new Promise((resolve, reject) => {
    axios.get(`http://${config.host}:${config.clientPort}${config.publicPath}react-loadable.json`)
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

// 预加载请求处理
const preFetchData = (routes, store, location) => {
  const matchedRoutes = matchRoutes(routes, location)
  // const promises = matchedRoutes.map(({ route, match }) => {
  //   return route.component && route.component.fetchData
  //     ? route.component.fetchData(store, match)
  //     : Promise.resolve(null)
  // })
  let promises = []
  // const promises = matchedRoutes.map(({ route, match }) => {
  //   return route.fetchData
  //     ? route.fetchData(store, match)
  //     : Promise.resolve(null)
  // })
  console.warn('promises', promises)
  return Promise.all(promises)
}

const Module = module.constructor
// 动态创建webpack
const serverCompiler = webpack(serverConfig)
// 将打包文件输出到内存中
// const mfs = new MemoryFS()
// serverCompiler.outputFileSystem = mfs
// 监听webpack 打包过程
serverCompiler.watch({}, (err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n'
  )
  stats = stats.toJson()
  // 打印error、warning 日志
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))
  // console.warn('stats:', Object.keys(stats))
  // console.warn('stats:', stats.assets)
  // console.warn('stats:', stats.modules.filter(item => item.id.includes('./client')))
  // 读取最终打包文件的内容
  const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename)
  const bundle = fs.readFileSync(bundlePath, 'utf-8')

  // 创建Module对象 将数据动态挂在到模块上
  const m = new Module()
  m._compile(bundle, 'server.js')
  serverBundle = m.exports.default
  serverBundle.routes = m.exports.routes
  serverBundle.stores = m.exports.stores
  serverBundle.models = m.exports.models
  serverBundle.preloadAll = m.exports.preloadAll
})

// 把SSR过的组件都转成script标签扔到html里
const generateBundleScripts = (bundles) => {
  return bundles
    .filter((bundle) => bundle.file.endsWith('.js'))
    .map((bundle) => {
      return `<script type="text/javascript" src="${bundle.publicPath}"></script>`
    })
}

module.exports = function (app, config) {
  app.use('/0.server.js', proxy({
    target: `http://${config.host}:${config.clientPort}/0.min.js`
  }))

  // 配置静态文件访问；通过代理中间件重定向访问地址
  app.use('/public', proxy({
    target: `http://${config.host}:${config.clientPort}`
  }))

  app.get('*', function (req, res) {
    if (serverBundle) {
      // serverBundle = require('../client/server')
      getTemplate(config).then(template => {
        const modules = []
        const routerContext = {}
        console.warn('serverBundle.stores:', serverBundle.stores.getState())
        console.warn('modules:', modules)

        serverBundle.preloadAll()().then(() => {
          preFetchData(serverBundle.routes, serverBundle.stores, req.url)
            .then(() => {
              getReactLoadableJson(config).then((stats) => {
                const app = serverBundle(routerContext, req.url, modules)
                console.warn('serverBundle=x:', serverBundle.models)
                console.warn('preFetchData --> after')
                // delete serverBundle.models.__esModule
                // console.warn('___', )
                // const Store = init({
                //   models: {
                //     app: serverBundle.models.app,
                //     blog: serverBundle.models.blog
                //   },
                //   redux: {}
                // })
                console.warn(stats)
                console.warn(modules)
                console.warn(app)
                const appString = ReactSSR.renderToString(app)
                console.warn('appString:', appString)
                // const bundles = getBundles(stats, modules)
                // console.warn('bundles:', bundles)
                // generateBundleScripts(bundles)
                const initialState = `<script> window.context={ INITIAL_STATE: ${JSON.stringify(serverBundle.stores.getState())}} </script>`
                res.send(template.replace('<!-- app -->', appString).replace('<!-- initial-state -->', initialState))
              }).catch(err => {
                console.warn(err)
                res.end()
              })
            })
            .catch((err) => {
            // res.send(template.replace('<!-- app -->', JSON.stringify(err)))
              console.warn(err)
              res.end()
            })
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
