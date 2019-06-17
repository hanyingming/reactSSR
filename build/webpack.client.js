const path = require('path')

const config = {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: '[name].min.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public/'
    }
}

module.exports = config