const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry:path.resolve(__dirname, 'src/main.js'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build')
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        port: '3011',
        open: true,
        hot: true
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}