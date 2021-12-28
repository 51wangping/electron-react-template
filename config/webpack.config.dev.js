const {merge} = require('webpack-merge');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const baseConfig =require('./webpack.config.base')
const WebpackBar = require('webpackbar');
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
    target:'electron-renderer',
    node: {
      __dirname: false,
      __filename: false
    },
    cache:true,
    plugins:[
      new Dotenv(),
      new WebpackBar({name:'渲染进程'}),
    ],
    optimization:{
      runtimeChunk: true
    }

    
  })
