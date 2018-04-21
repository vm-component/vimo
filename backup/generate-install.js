var util = require('./util')
var webpack = require('webpack')

/**
 * @return {Promise}
 * */
module.exports = function generateInstall () {
  return new Promise((resolve, reject) => {
    let webpackConfigs = util.installWebpackOption()
    webpack(webpackConfigs, function (err) {
      if (err) {
        console.log(err)
        reject(err)
        throw err
      }
      resolve && resolve()
    })
  })
}
