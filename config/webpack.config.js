const {merge} = require('webpack-merge');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const baseConfig =require('./webpack.config.base')

module.exports= merge(baseConfig,{
    mode:'development',
    devServer: {
      static: {
        directory: path.join(__dirname, '../public'),
      },
      compress: true,
      port: 9000,
    },
    cache:true,
    plugins:[
      new Dotenv(),
    ],
    optimization:{
      runtimeChunk: true
    }

    
  })
