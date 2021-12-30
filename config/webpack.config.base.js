
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const lessModuleRegex = /\.module\.less$/
process.env.PUBLIC_URL = path.resolve(__dirname,'../public')
module.exports ={
  entry:'./index.tsx',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name][contenthash:10].js',
  },
  stats: "minimal",
  devtool:'cheap-source-map',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    mainFields: ['jsnext:main', 'module','browser', 'main'],
    extensions: [".ts", ".tsx", ".js", ".json",'.less','.css']
},
  module:{
    rules: [
    {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      exclude:  /node_modules/,
       enforce: "pre",
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          sourceMaps: true,
          inputSourceMap: true,
          presets: [["@babel/preset-react"],
          ['@babel/preset-env',{
            useBuiltIns:'usage',
            corejs:{
              version:2
            },
          }],['@babel/preset-typescript']],
          plugins:["@babel/plugin-transform-runtime","@babel/plugin-syntax-jsx"],
        },
      },
      "ts-loader",
    ],
  },
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader",{
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
  new ESLintPlugin(),
  new FriendlyErrorsWebpackPlugin()
],
}