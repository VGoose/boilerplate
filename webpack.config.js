const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'react-dom', 'react'
];

const config = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    //babel configuration
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        //excludes node modules
        exclude: /node_modules/
      },
      {
        //css-loader handles css, style-loader places css into html
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor", 
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['vendor', 'manifest']
    // }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};

module.exports = config;