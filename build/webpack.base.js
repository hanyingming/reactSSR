const path = require('path')

const config = {
  mode: 'none',
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
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
  }
}

module.exports = config
