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
        test: /\.svg$/,
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