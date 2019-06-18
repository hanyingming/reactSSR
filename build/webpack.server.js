const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  mode: 'development',
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server.js')
  },
  output: {
    filename: 'server.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/',
    libraryTarget: 'commonjs2' // 最新commonjs规范
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
  }
}

module.exports = config
