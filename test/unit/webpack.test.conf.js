// This is the webpack config used for unit tests.

var utils = require('../../examples/build/utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('../../examples/build/webpack.base.conf')

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
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
