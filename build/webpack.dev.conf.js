var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, "../src/main.js"), //已多次提及的唯一入口文件
        common: ['vue', 'vue-router' /*, 'jquery', 'bootstrap'//bootstrap的jquery插件列表，前期只用css，后面跟进需要决定*/ ]
    },
    output: {
        path: path.resolve(__dirname, "../dist"), //打包后的文件存放的地方
        filename: "[name].[chunkhash].js", //打包后输出文件的文件名
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, '../'),
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader'
            })
        }, {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000'
        }]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.html')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: function(module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        //CommonChunksPlugin will now extract all the vendor modules from vendor and main bundles
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest' //But since there are no more vendor modules between them we end up with just the runtime code included in the manifest file
        })
    ]
};