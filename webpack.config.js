const webpack = require('webpack');
const path = require('path');
const config = {

  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {

    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(ttf|eot|svg|jpg|jpeg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
      }
    ]
  },
  devServer: {
    'static': {
      directory: path.join(__dirname, './dist'),
    },
    historyApiFallback: true,
    compress: true,
    port: 8080,
  },
};
module.exports = config;