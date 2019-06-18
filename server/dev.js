const path = require('path')
const webpack = require('webpack')
const MemoryFS = require('memory-fs');
const ReactSSR = require('react-dom/server')
const axios = require('axios')
const proxy = require('http-proxy-middleware')

const serverConfig = require('../build/webpack.server.js');

// 获取渲染模板
const getTemplate = (config) => {
  return new Promise((resolve, reject) => {
    axios.get(`http://${config.host}:${config.port}/public/index.html`)
    .then(res => {
      resolve(res.data)
    })
    .catch(reject)
  })
}

let serverBundle
const Module = module.constructor
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename)
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')

  const m = new Module()
  m._compile(bundle, 'server.js')
  serverBundle = m.exports.default
})


module.exports = function(app, config) {

  app.use('/public', proxy({
    target: `http://${config.host}:${config.port}/public`
  }))

  app.get('*', function(req, res) {
    getTemplate(config).then(template => {
      const appString = ReactSSR.renderToString(serverBundle)
      res.send(template.replace("<!-- app -->", appString))
    })
  })
}
