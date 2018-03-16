const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  context: path.join(__dirname, 'src'),
  entry: {
    blogs: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './index.jsx'
    ]
  },
  output: {
    path: path.join(__dirname, './build'),
    filename: '[name].js',
    publicPath: '/'
  },
  node: {
    dns: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    module: 'empty'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 8081
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })

      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?url=false&minimize=true', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'Test',
      hash: true,
      template: './index.html'
    }),
    new ExtractTextPlugin({
      filename: 'main.css',
      allChunks: true
    })
  ]
};

module.exports = config;
