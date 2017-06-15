var path = require('path')

module.exports = {
    devtool: 'source-map',
    entry: [
        './front-end/src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    devServer: {
        port: 3000,
        proxy: [{
            path: '/api/',
            target: 'http://localhost:3001'
        }],
        historyApiFallback: {
          index: './front-end/public/index.html'
        }
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loaders: ['babel'],
                include: path.join(__dirname, 'front-end/src')
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
                include: path.join(__dirname, 'front-end/styles')
            }
        ]
    }
}
