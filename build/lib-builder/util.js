var config = require('./config')
var fs = require('fs')

exports.getComponentFileNames = function getComponentFileNames () {
  return new Promise((resolve, reject) => {
    fs.readdir(config.componentPath, function (err, files) {
      if (err) {
        reject(err)
        throw err
      }

      // ignore hidden file or private file, eg: .DS_Store / _tmp
      let filterCondition = (fileName) => {
        return fileName.indexOf('.') === -1 && fileName.indexOf('_') !== 0
      }

      // file names
      var componentsFileNames = files.filter((fileName) => filterCondition(fileName))

      // console.log(componentsFileNames)
      resolve && resolve(componentsFileNames)
    })
  })
}
