const webpack = require('webpack');
const path = require('path');

const ENTRY = path.resolve(__dirname, 'client/public/index.jsx');
const BUILD_DIR = path.resolve(__dirname, 'client/dist');

const config = {
  entry: ENTRY,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module : {
    loaders : []
  }
};  

config.module.loaders.push({
  test: /\.js[x]?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: { 
    presets: ['es2015', 'react'],
    plugins: ['transform-class-properties']
  },
});

module.exports = config;