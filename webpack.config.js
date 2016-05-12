(function() {
  'use strict'

  var path = require('path')
  var webpack = require('webpack')
  var LiveReloadPlugin = require('webpack-livereload-plugin');

  module.exports = [
    {

      debug: true,

      // devtool: 'source-map',

      entry: {
        'server': ['./server.js'],
      },

      target: 'node',

      output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
      },

      resolve: {
        alias: {
          'react-native': 'react-native-web',
        },
      },

      module: {

        preLoaders: [
          // {
          //   test: /\.(js|jsx|es6)$/,
          //   include: path.resolve(__dirname, 'src'),
          //   loader: 'eslint-loader',
          // }
        ],

        loaders: [
          {
            test: /\.js$/,
            include: /node_modules\/react-native/,
            loader: 'babel',
            query: {
              cacheDirectory: true,
              presets: ['es2015', 'stage-1', 'react'],
            }
          },
          {
            test: /\.json$/,
            // exclude: /node_modules/,
            loader: 'json',
          },
          {
            test: /\.(js|jsx|es6|json)$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              cacheDirectory: true,
              presets: ['es2015', 'stage-1', 'react'],
            }
          },
          // {
          //   test: /\.(gif|jpe?g|png|svg)$/,
          //   loader: 'url-loader',
          //   query: { name: '[name].[hash:16].[ext]' },
          // },
        ],
      },
    },
    {

      debug: true,

      // devtool: 'source-map',

      entry: {
        'main.browser': ['./main.browser.js'],
      },

      output: {
        path: path.resolve(__dirname, 'webdist'),
        filename: '[name].js',
      },

      resolve: {
        alias: {
          'react-native': 'react-native-web',
        },
      },

      plugins: [
        new LiveReloadPlugin({
          port: 9982,
        }),
      ],

      module: {

        preLoaders: [
          // {
          //   test: /\.(js|jsx|es6)$/,
          //   include: path.resolve(__dirname, 'src'),
          //   loader: 'eslint-loader',
          // }
        ],

        loaders: [
          {
            test: /\.js$/,
            include: /node_modules\/react-native/,
            loader: 'babel',
            query: {
              cacheDirectory: true,
              presets: ['es2015', 'stage-1', 'react'],
            }
          },
          {
            test: /\.json$/,
            // exclude: /node_modules/,
            loader: 'json',
          },
          {
            test: /\.(js|jsx|es6|json)$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              cacheDirectory: true,
              presets: ['es2015', 'stage-1', 'react'],
            }
          },
          {
            test: /\.(gif|jpe?g|png|svg)$/,
            loader: 'url-loader',
            query: { name: '[name].[hash:16].[ext]' },
          },
        ],
      },

    }
  ];

}())