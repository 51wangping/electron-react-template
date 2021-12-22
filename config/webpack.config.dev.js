const {merge} = require('webpack-merge');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const baseConfig =require('./webpack.config.base')
const WebpackBar = require('webpackbar');
const nodeExternals = require('webpack-node-externals')
module.exports= merge(baseConfig,{
    mode:'development',
    devServer: {
      historyApiFallback:{
        index:'./index.html'
      },
      static: { 
        directory: path.join(__dirname, '../public'),
      },
      compress: true,
      hot:true,
      port: 9000,
    },
    target:'electron-renderer',
    externals: [nodeExternals()],
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
