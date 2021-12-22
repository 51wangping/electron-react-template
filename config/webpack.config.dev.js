const {merge} = require('webpack-merge');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const baseConfig =require('./webpack.config.base')
const WebpackBar = require('webpackbar');
module.exports= merge(baseConfig,{
    mode:'development',
    devServer: {
      static: {
        directory: path.join(__dirname, '../public'),
      },
      compress: true,
      port: 9000,
    },
    //  target:'electron-renderer',
    cache:true,
    plugins:[
      new Dotenv(),
      new WebpackBar({name:'渲染进程'}),
    ],
    optimization:{
      runtimeChunk: true
    }

    
  })
