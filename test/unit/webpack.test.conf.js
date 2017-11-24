// This is the webpack config used for unit tests.
var path = require('path')
var utils = require('../../examples/build/utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('../../examples/build/webpack.base.conf')

var root = process.cwd()

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vimo': `${root}/src`
    }
  },
  module: {
    rules: utils.styleLoaders()
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"testing"'
      }
    })
  ]
})

// no need for app entry during tests
delete webpackConfig.entry
delete webpackConfig.output

module.exports = webpackConfig
