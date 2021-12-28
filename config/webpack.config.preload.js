const {merge} = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const WebpackBar = require('webpackbar');
const {CleanWebpackPlugin} =require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const baseConfig =require('./webpack.config.base')
const path = require('path');
module.exports= merge(baseConfig,{
  entry:'./electron/preload.js',
  output:{
    path: path.resolve(__dirname, '../build_electron'),
    filename: 'preload.js'
  },
    target:'electron-preload',
    mode:'production',
    performance: {
      hints: false
    },
    devtool:false,
    externals: [nodeExternals()],
    node: {
      __dirname: false,
      __filename: false
    },
    plugins:[
      new Dotenv({
      path:path.resolve(__dirname,'../.env.production')
    }),
   new WebpackBar({name:'主进程',color:'red'}),
  ]
  })