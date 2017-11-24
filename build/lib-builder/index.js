/**
 * build for ->
 * npm run pub:lib
 * */
var rm = require('rimraf')
var chalk = require('chalk')
var config = require('./config')
const fs = require('fs-extra')
var glob = require('glob')
var babel = require('@babel/core')

rm(`${config.libPath}`, err => {
  if (err) throw err
  // copy src files
  var srcPath = `${config.srcPath}`
  var libPath = `${config.libPath}`
  fs.copy(srcPath, libPath)
  .then(() => {
    console.log(chalk.green(`[Lib-Builder] srcPath->libPath move success!`))
    glob(`${libPath}/**/**.js`, {}, function (er, files) {
      let total = files.length
      let index = 0
      files.forEach((file) => {
        babel.transformFile(file, {
          presets: ['@babel/env', '@babel/stage-2']
        }, (err, result) => {
          fs.createWriteStream(file)
          fs.writeFile(file, result.code, function (err) {
            if (err) throw err
            var component = file.split('lib')[1]
            console.log(chalk.cyan(`    (${index}/${total - 1}) ${component}`))
            if (index >= total - 1) {
              console.log(chalk.green(`[Lib-Builder] Babel transfer done!`))
            } else {
              index++
            }
          })
        })
      })
    })
  })
  .catch(err => console.error(err))
})
