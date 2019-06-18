const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  mode: 'development',
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
      })
  ]

}

module.exports = config
