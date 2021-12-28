
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const lessModuleRegex = /\.module\.less$/
process.env.PUBLIC_URL = path.resolve(__dirname,'../public')
module.exports ={
  entry:'./index.tsx',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
  },
  stats: "minimal",
  devtool:'source-map',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json",'.less','.css']
},
  module:{
    rules: [
      {
        test: /\.tsx?$/, 
        use:[ 'ts-loader' ],
        exclude:  /node_modules/,
      },
    {
      test: /\.m?js$/,
      exclude:  /node_modules/,
      enforce: "pre",
      use: {
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-react",'@babel/preset-env'],
          plugins:["@babel/plugin-transform-runtime","@babel/plugin-syntax-jsx"]
        }
      }
    },
    {
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
    {
      test: /\.less$/i,
      exclude:lessModuleRegex,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader:'less-loader',
          }
        ],
    },
    {
      test: lessModuleRegex,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options:{
              modules:true
            }
          },
          {
            loader:'less-loader',
          }
        ],
    },
    {
      test:/\.(jpg|png|gif|bmp|jpeg|ico)$/ ,
      use:['url-loader'],
      generator:{
        filename:'static/[name].[ext]'
      }
     }
  ],
  },
  plugins: [
  new MiniCssExtractPlugin(),
  new ESLintPlugin(),
  new FriendlyErrorsWebpackPlugin()
],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(),new CssMinimizerPlugin()],
  },
}