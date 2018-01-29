'use strict'
const pkg = require('../package')

module.exports = {
  title: 'vue-framework7',
  // Options for webpack-dev-server
  // See https://webpack.js.org/configuration/dev-server
  devServer: {
    host: 'localhost',
    port: 8081
  },
  // when you use electron please set to relative path like ./
  // otherwise only set to absolute path when you're using history mode
  publicPath: '/',
  cssModules: true,
  jsx: true
}
