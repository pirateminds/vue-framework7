const path = require('path');
const   fs = require('fs');
const _ = require('./build/utils');
const config = require('./build/config');

const webpack = require('webpack');
const CordovaHtmlOutputPlugin = require('./webpack/plugins/CordovaHtmlOutputPlugin.js');
const base = require('./build/webpack.dev');
const CleanPlugin = require('clean-webpack-plugin');
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const OfflinePlugin = require('offline-plugin')
const rm = require('rimraf')

let entryFile = path.join(__dirname, './src/index.js');
let devServerPort = 8081;

module.exports = function(env) {
  console.log(env);

  base.entry.client = entryFile;
  base.resolve.modules = ['node_modules', path.join(__dirname, 'src')];
  base.devtool = 'eval-source-map';
  base.output.publicPath = "./";

  base.plugins.length = base.plugins.length - 4;

  if (env) {
    if (typeof env === 'undefined' || typeof env.devserver === 'undefined') {
      // base.plugins.push(new CordovaHtmlOutputPlugin())
      // base.plugins.push(new ExtractTextPlugin("styles.css"))
      // bae.module.rules.push({
      //   test: /\.css$/, use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: "css-loader"
      //   })
      // })
    }

    if (typeof env.devserver !== 'undefined' && env.devserver) {
      base.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        }),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrors()
      )

      base.entry.client = [
        entryFile,
        path.resolve(__dirname, './src/dev-client.js'),
        path.resolve(__dirname, "webpack/dev_helpers/CordovaDeviceRouter.js")
      ];

      // base.devtool = "eval"
      base.devServer = {
        contentBase: path.join(__dirname, "www"),
        port: devServerPort,
        stats: {colors: true},
        watchOptions: {
          aggregateTimeout: 300,
          poll: 1000
        },
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        host: "0.0.0.0"
      }
      base.plugins.push(new webpack.NamedModulesPlugin())
    } else if (typeof env.release !== 'undefined' && env.release) {
      rm.sync('www/*')
      // use hash filename to support long-term caching
      base.output.filename = '[name].[chunkhash:8].js'
      base.plugins.push(
        new CleanPlugin("www", {
          root: path.join(__dirname, "."),
          dry: false,
          verbose: false,
          exclude: ["index.html"]
        }),
        new ProgressPlugin(),
        new ExtractTextPlugin('styles.[contenthash:8].css'),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          compress: {
            warnings: false
          },
          output: {
            comments: false
          }
        }),
        // extract vendor chunks
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: module => {
            return module.resource && /\.(js|css|es6)$/.test(module.resource) && module.resource.indexOf('node_modules') !== -1
          }
        }),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'manifest'
        }),
        // progressive web app
        // it uses the publicPath in webpack config
        new OfflinePlugin({
          relativePaths: false,
          ServiceWorker: {
            events:true,
            navigateFallbackURL:'/'
          },
          AppCache: {
            events:true,
            FALLBACK:{ '/':'/' }
          }
        })
      )

      base.stats = {
        // Add children information
        children: false,
        // Add chunk information (setting this to `false` allows for a less verbose output)
        chunks: false,
        // Add built modules information to chunk information
        chunkModules: false,
        chunkOrigins: false,
        modules: false
      }
    }
  }

  return base;
};
