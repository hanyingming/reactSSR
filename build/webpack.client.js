const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const configBase = require('./webpack.base')

const isProd = process.env.NODE_ENV === 'production'

const config = webpackMerge(configBase, {
  mode: isProd ? 'production' : 'development',
  target: 'web',
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].min.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '../client/index.html')
    })
  ]
})

console.warn('isProd:', isProd)

// 开发环境
if (!isProd) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0',
    port: '7000',
    hot: true,
    contentBase: path.join(__dirname, '../dist'),
    publicPath: '/public/',
    overlay: {
      errors: true
    },
    historyApiFallback: {
      index: '/public/index.html'
    }
  }
  // 配置模块热更新 HMR
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

// 线上环境
if (isProd) {

}

module.exports = config
