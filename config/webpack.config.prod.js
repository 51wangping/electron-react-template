const {merge} = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require("copy-webpack-plugin");
const {CleanWebpackPlugin} =require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig =require('./webpack.config.base')
const path = require('path');
const webpack =require('webpack')
const nodeExternals = require('webpack-node-externals')
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
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
        },{
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader,"style-loader", "css-loader",{
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    require('autoprefixer')({
                      "overrideBrowserslist": [
                        "> 1%",
                        "last 7 versions",
                        "not ie <= 8",
                        "ios >= 8",
                        "android >= 4.0"
                      ]
                    })
                  ]
                }
              }
            
          }],
        },
      ]
    },
    target:'electron-renderer',
    externals: [nodeExternals()],
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
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin({
      dry:false,
      cleanOnceBeforeBuildPatterns:['../build','../package'],
      dangerouslyAllowCleanPatternsOutsideProject:true
    }),
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/index.html')
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: new RegExp("^(fs|ipc|path)$"),
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(),new CssMinimizerPlugin()],
  },
  })