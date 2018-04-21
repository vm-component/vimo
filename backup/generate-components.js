var util = require('./util')
var chalk = require('chalk')
var webpack = require('webpack')

/**
 * @param {String} fileNames - fileNames
 * @return {Promise}
 * */
module.exports = function generateComponents (fileNames) {
  return new Promise((resolve, reject) => {
    let total = fileNames.length
    let index = 0
    for (let i = 0, len = total; len > i; i++) {
      let fileName = fileNames[i]
      let webpackConfigs = util.componentWebpackOption(fileName)
      webpack(webpackConfigs, function (err) {
        if (err) {
          reject(err)
          throw err
        }
        console.log(chalk.cyan(`[Lib-Builder] Component[${fileName}]: Done! (${index}/${total - 1})`))
        if (index >= total - 1) resolve()
        index++
      })
    }
  })
}
