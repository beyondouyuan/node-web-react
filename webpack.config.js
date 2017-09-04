/*
 * @Author: beyondouyuan
 * @Date:   2017-08-29 04:57:09
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2017-09-03 16:40:12
 */

const webpack = require('webpack');
// extract-text-webpack-plugin：将css单独打包成一个文件
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
    // 入口文件
    entry: {
        index: __dirname + '/client/src/main.js',
        // 将react和react-dom这些单独打包出来，减小打包文件体积
        vender: [
            'react',
            'react-dom'
        ]
    },
    // 打包输出
    output: {
        path: __dirname + '/client/dist',
        filename: 'js/[name].js'
    },
    // resolve: {
    //     extensions: [".js", ".json"]//当requrie的模块找不到时，添加这些后缀
    // },
    // 模块加载
    module: {
        loaders: [{
            test: /\.js|.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader' // 旧版本的webpack可以省略写成babel，新版本的每个loader都不克在省略
        }, {
            test: /\.(scss|sass|css)$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader!postcss-loader', {
                pubkicPath: '../'
            })
        }, {
            test: /\.(png|jpg|jpng|eot|ttf)$/,
            loader: 'url-loader?limit=8192&name=images/[name].[ext]'
        }]
    },
    // 插件配置
    plugins: [
        // 这是之前单独打包出来的react、react-dom等文件
        new webpack.optimize.CommonsChunkPlugin({ name: 'vender', filename: 'js/vender.bundle.js' }),
        // 将所有sass/css文件打包成一个index.css文件
        new ExtractTextPlugin('css/index.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        //  压缩打包后的代码
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
        // 热更新
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        // contentBase: __dirname + '/public', // 本地服务器说加载的页面所在目录 可以不添加该选项
        contentBase: __dirname + '/client/dist',
        historyApiFallback: true, // 不跳转
        inline: true, // 实时刷新
        // hot: true
        // webpack-dev-server2.x后不再支持colors、hot、prosses等参数
        // 配置webpack dev server单独启动而不是结合exprees服务器时的代理 如执行npm start 而不是执行其他命令时即是单独使用webpack dev server
        proxy: {
            "/api/*": {
                target: "http://localhost:4000",
                secure: true,
            }
        }
    }
}

module.exports = config;
