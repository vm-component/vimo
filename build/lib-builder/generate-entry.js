/**
 * 根据组件名称自动生成lib的entry
 * */
var startcase = require('lodash.startcase')
var config = require('./config')
var fs = require('fs')

/**
 * @param {Array} fileNames - 文件名称列表
 * @return {Promise}
 * */
module.exports = function generateEntry (fileNames) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(fileNames)) {
      let err = new Error(`generateEntry: the params of fileNames must pass in a array, but got a ${typeof fileNames}!`)
      reject(err)
      throw err
    }
    let startcaseNames = []
    let importString = '/** this file is generate by ./build/lib-builder/build-entry.js */\n'
    fileNames.forEach(function (item) {
      let _startcase = startcase(item).split(' ').join('')
      let _importString = `export { default as ${_startcase} } from './components/${item}'\n`
      startcaseNames.push(_startcase)
      importString += _importString
    })

    importString += `export { default as Install } from './install.js'\n`

    importString += `\nvar ENV = process.env.NODE_ENV
if (ENV && ENV !== 'production' && ENV !== 'test' && typeof console !== 'undefined' && console.warn && typeof window !== 'undefined') {
  console.warn('You are using a whole package of vimo, ' + 'please read docs https://vm-component.github.io/vimo/ to reduce app bundle size.')
}
`

    fs.createWriteStream(`${config.srcPath}/index.js`)
    fs.writeFile(`${config.srcPath}/index.js`, importString, function (err) {
      if (err) {
        reject(err)
        throw err
      }
      resolve && resolve()
    })
  })
}
