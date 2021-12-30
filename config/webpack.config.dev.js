const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const baseConfig =require('./webpack.config.base')
const path =require('path')
const WebpackBar = require('webpackbar');
const webpack =require('webpack')
module.exports= merge(baseConfig,{
    mode:'development',
    entry:['react-hot-loader/patch','./index.tsx'],
    devServer: {
      static: { 
        // directory: path.join(__dirname, '../public'),
       publicPath:'http://localhost:9000/',
      }, 
      compress: true,
      hot:true,
      port: 9000,
    },
    target:'web',
    node: {
      __dirname: false,
      __filename: false
    },
    cache: {
      // 磁盘存储
      type: "filesystem",
      buildDependencies: {
        // 当配置修改时，缓存失效
        config: [__filename]
      }
    },
    plugins:[
      new Dotenv(),
      new HtmlWebpackPlugin({
        title: 'Electron React Template',
        template:path.resolve(__dirname,'../public/index.html')
      }),
      new WebpackBar({name:'渲染进程'}),
      // new webpack.DllPlugin({
      //   context: __dirname,
      //   name: '[name]_[fullhash]',
      //   path: path.join(__dirname, '../build/manifest.json'),
      // }),
      // new webpack.DllReferencePlugin({
      //   context: __dirname,
      //   manifest: require('../build/manifest.json'),
      //   scope: 'xyz',
      //   sourceType: 'commonjs2',
      // })
      
    ],
    optimization:{
      runtimeChunk: true
    }

    
  })
