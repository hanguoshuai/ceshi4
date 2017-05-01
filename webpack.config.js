var chouli = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports={
    // entry:'./src/script/app.js',
    entry:{
        app:'./src/script/app.js'
    },
    output:{
        path:__dirname+'/build',
        // filename:'app.js'
        filename:'[name]_[hash].js'
    } ,
    // 用来热替换的
    devServer:{
        contentBase:'./build',
        host:'localhost',
        port:7000
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader'
            },
           
            // css打包
            // {
            //     test:/\.css$/,
            //     loader:'style-loader!css-loader'
            // },
            // css抽离
            {
                test:/\.css$/,
                loader:chouli.extract({
                    fallback:'style-loader',
                    use:'css-loader'
                })
            },
            //scss打包
            // {
            //     test:/\.scss$/,
            //     loader:'style-loader!css-loader!sass-loader'
            // }
            //scss抽离
            {
                test:/\.scss$/,
                loader:chouli.extract({
                    fallback:'style-loader',
                    use:'css-loader!sass-loader'
                })
            }
        ]
    },
    // 抽离css
    plugins:[
        //1,抽离css样式
        new chouli({
            filename:'app.css',
            allChunks:true,
            disable:false
        }),
        //2.自动生成plugin模板
        new HtmlWebpackPlugin({
            template:'./src/index.ejs',
            filename:'index1.html',
            title:'我是韩国帅',
            name:'eeee'
        }),
        //3,压缩代码
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            },
            output:{
                comments:false
            }
        }),
        //4,自动打开浏览器
        // new OpenBrowserPlugin({
        //     url:'http://localhost:7000'
        // })

    ]




}