const path = require('path')

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
        test: /\.js/,
        loader: 'babel-loader'
      }, {
        test: /\.jsx/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }]
    }
}

module.exports = config
