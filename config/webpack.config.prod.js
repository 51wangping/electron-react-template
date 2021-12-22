const {merge} = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require("copy-webpack-plugin");
const {CleanWebpackPlugin} =require('clean-webpack-plugin')
const baseConfig =require('./webpack.config.base')
const path = require('path');
const webpack =require('webpack')
const WebpackBar = require('webpackbar');
module.exports= merge(baseConfig,{ 
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
    target:'electron-renderer',
    plugins:[
      new Dotenv({
      path:path.resolve(__dirname,'../.env.production')
    }),
    new WebpackBar({name:'渲染进程'}),
    new CopyPlugin({
      patterns: [
        { from: "public", to: "" ,filter:async (resourcePath)=>{
          if(resourcePath.lastIndexOf('index.html')!==-1){
            return false
          }   
          return true;

        }},
      ],
    }),
    new CleanWebpackPlugin({
      dry:false,
      cleanOnceBeforeBuildPatterns:['../build','../package'],
      dangerouslyAllowCleanPatternsOutsideProject:true
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: new RegExp("^(fs|ipc|path)$"),
    })
  ]
  })