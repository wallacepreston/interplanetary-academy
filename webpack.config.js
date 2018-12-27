'use strict'

const { resolve } = require('path')

module.exports = {
  entry: {
    js: ['babel-polyfill', './app/main'],
    vendor: ['react']
  },
  output: {
    path: resolve(__dirname, '/public'),
    filename: '[name].js'
  },
  mode: 'development',
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        include: resolve(__dirname, './app'),
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
