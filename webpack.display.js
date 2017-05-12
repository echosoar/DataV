var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var precss = require('precss')
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    datav: './display/index.js'
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: '[name].js'
  },
  externals: {'react': 'React', 'react-dom': 'ReactDOM', 'react-router': 'ReactRouter'},
  plugins: [],
  resolve: {
    alias: {
      datav: path.resolve(__dirname, 'display')
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [
          path.resolve(__dirname, 'display')
        ]
      },
	  {	test   : /\.css$/, loaders: ['style-loader', 'css-loader', 'postcss-loader', 'resolve-url-loader']},
	  {	test   : /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader', 'resolve-url-loader']},
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader?modules&localIdentName=[local]-[hash:base64:5]', 'postcss-loader', 'sass-loader'] },
      { test: /\.(ttf|eot|woff|woff2|otf|svg)/, loader: 'file-loader?name=./font/[name].[ext]' },
      { test: /\.json$/, loader: 'file-loader?name=./json/[name].json' },
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=100000&name=./images/[name].[ext]' }
    ]
  },
  postcss: function () {
    return [autoprefixer({ browsers: ['> 1%', 'IE 9'] }), precss]
  },
  plugins: []
}
