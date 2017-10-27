var utils = require('./utils')
var config = require('../config/index')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  // postcss: [require('postcss-px2rem')({remUnit: 50})],
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  })
}
