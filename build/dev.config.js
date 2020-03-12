const path = require('path');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
  // hot-client
  entry: {
    index: ['./client/index.js'],
    polyfills: ['./client/polyfills.js']
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              hmr: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              hmr: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              minimize: false,
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
              sourceMap: true,
              plugins: [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json'
    })
  ]
});
