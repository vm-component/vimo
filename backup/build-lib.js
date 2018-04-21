/**
 * 传入组件名称进行构建(独立使用)
 * @param {String} fileName - 文件名称
 * @private
 * */
var webpack = require('webpack')
var webpackConfigFactory = require('./webpack-config-factory.js')

module.exports = function buildLib (fileName) {
  if (!fileName || fileName === undefined || fileName === 'undefined') {
    return
  }
  console.log(`lib-builder: ${fileName} will building to lib...`)
  let webpackConfigs = webpackConfigFactory(fileName)
  webpack(webpackConfigs, function (err, stats) {
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    console.log(`DONE -> ${fileName}`)
  })
}
