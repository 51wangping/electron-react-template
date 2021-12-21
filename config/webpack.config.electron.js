const {merge} = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require("copy-webpack-plugin");
const {CleanWebpackPlugin} =require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const baseConfig =require('./webpack.config.base')
const path = require('path');
module.exports= merge(baseConfig,{
  entry:'./electron/main.js',
  output:{
    path: path.resolve(__dirname, '../build_electron'),
    filename: '[name].js'
  },
    target:'electron-main',
    mode:'production',
    performance: {
      hints: false
    },
    devtool:false,
    module:{
      rules:[
        {
         test:/\.(jpg|png|gif|bmp|jpeg|ico)$/ ,
         use:['url-loader'],
         generator:{
           filename:'static/[name].[ext]'
         }
        }
      ]
    },
    externals: [nodeExternals()],
    node: {
      __dirname: false,
      __filename: false
    },
    plugins:[
      new Dotenv({
      path:path.resolve(__dirname,'../.env.production')
    }),
    new CleanWebpackPlugin({
      dry:false,
      cleanOnceBeforeBuildPatterns:['../build_electron'],
      dangerouslyAllowCleanPatternsOutsideProject:true
    }),

  ]
  })