const cpy = require('cpy')
const config = require('./config')
let srcPath = config.srcPath
let libPath = config.libPath

/**
 * @return {Promise}
 * */
module.exports = function generateTheme () {
  return new Promise((resolve) => {
    let srcThemePath = `${srcPath}/themes/*.{less,scss}`
    let srcAnimationPath = `${srcPath}/animations/*.{less,scss}`
    let libThemePath = `${libPath}/themes`
    let libAnimationPath = `${libPath}/animations`
    cpy(srcThemePath, libThemePath).then(() => {
      cpy(srcAnimationPath, libAnimationPath).then(() => {
        resolve()
      })
    })
  })
}
