const path = require('path')
const webpackMerge = require('webpack-merge')
const configBase = require('./webpack.base')

const config = webpackMerge(configBase, {
  mode: 'development',
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
