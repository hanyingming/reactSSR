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
    publicPath: '/public/',
  },
  module: {
    rules: [{
      test: /\.js/,
      loader: 'babel-loader',
      exclude: [
        path.join(__dirname, '../node_modules')
      ],
      // options: {
      //   presets: ['@babel/preset-env', '@babel/preset-react']
      // }
    }, {
      test: /\.jsx/,
      loader: 'babel-loader',
      // options: {
      //   presets: ['@babel/preset-env', '@babel/preset-react']
      // }
    }]
  },
  plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.join(__dirname, '../client/index.html'),
      }),
      new webpack.HotModuleReplacementPlugin()
  ]
}
// 开发环境
if (isDev) {
  config.devServer = {
    host: '0.0.0.0',
    port: '8000',
    hot: true,
    contentBase: path.join(__dirname, '../dist'),
    publicPath: '/public',
    openPage: '/index.html',
    overlay: {
      errors: true
    },
    historyApiFallback: {
      index: '/public/index.html'
    }
  }
}


// 线上环境
if (isProd) {

}


module.exports = config
