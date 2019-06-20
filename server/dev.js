const path = require('path')
const webpack = require('webpack')
const MemoryFS = require('memory-fs') // 内存
const ReactSSR = require('react-dom/server') // 服务器端渲染
const axios = require('axios')
const proxy = require('http-proxy-middleware') // http代理中间件

// 服务器端webpack 配置；用于动态初始化webpack
const serverConfig = require('../build/webpack.server.js')

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

// 通过module到处的打包数据
let serverBundle
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
})

module.exports = function (app, config) {
  // 配置静态文件访问；通过代理中间件重定向访问地址
  app.use('/public', proxy({
    target: `http://${config.host}:${config.clientPort}`
  }))

  app.get('*', function (req, res) {
    console.warn(333)
    getTemplate(config).then(template => {
      // 获取渲染模板后整合渲染数据，返回给客户端
      const appString = ReactSSR.renderToString(serverBundle)
      res.send(template.replace('<!-- app -->', appString))
    })
  })
}
