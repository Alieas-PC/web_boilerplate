const path = require('path');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
  output: {
    path: path.resolve(__dirname, '../dist_tmp/client'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              modules: false,
              url: false
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              modules: true,
              localIdentName: '[local]_[sha1:hash:base64:5]',
              importLoaders: 2,
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: false,
              plugins: [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new ReactLoadablePlugin({
      filename: './dist_tmp/react-loadable.json'
    })
  ]
});
