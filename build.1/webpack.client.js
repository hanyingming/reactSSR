const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const config = {
  mode: 'none',
  target: 'web',
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.(js|jsx)$/,
      loader: 'eslint-loader',
      exclude: [
        path.join(__dirname, '../node_modules')
      ]
    }, {
      test: /\.js/,
      loader: 'babel-loader',
      exclude: [
        path.join(__dirname, '../node_modules')
      ]
    // options: {
    //   presets: ['@babel/preset-env', '@babel/preset-react']
    // }
    }, {
      test: /\.jsx/,
      loader: 'babel-loader'
    // options: {
    //   presets: ['@babel/preset-env', '@babel/preset-react']
    // }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '../client/index.html')
    })
  ]
}
// 开发环境
if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0',
    port: '8000',
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
