const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../config');

module.exports = {
  entry: {
    index: './client/index.js',
    polyfills: './client/polyfills.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.scss', '.css'],
    alias: {
      // shorten directories paths
      '@module': path.resolve(__dirname, '..', 'client/module/')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.generated.html',
      template: './html/index.html',
      chunks: ['index', 'main'],
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEPLOY_ENV': JSON.stringify(process.env.DEPLOY_ENV),
      'process.env.domain': JSON.stringify(config.domain),
      'process.env.RSA_PUB_KEY': JSON.stringify(
        config.cipher.clientToServer.pubKey
      )
    }),
    new CopyWebpackPlugin([path.resolve(__dirname, '../static/**/*')])
  ],
  node: {
    fs: 'empty',
    path: 'empty'
  }
};
