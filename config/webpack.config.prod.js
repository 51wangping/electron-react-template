const {merge} = require('webpack-merge');
const fs = require("fs");
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require("copy-webpack-plugin");
const baseConfig =require('./webpack.config.base')
const path = require('path');
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
    plugins:[
      new Dotenv({
      path:path.resolve(__dirname,'../.env.production')
    }),
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
  ]
  })