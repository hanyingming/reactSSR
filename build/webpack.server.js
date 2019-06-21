const path = require('path')
const webpackMerge = require('webpack-merge')
const configBase = require('./webpack.base')

const isProd = process.env.NODE_ENV === 'production'

const config = webpackMerge(configBase, {
  mode: isProd ? 'production' : 'development',
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server.js')
  },
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2' // 最新commonjs规范
  }
})

module.exports = config
