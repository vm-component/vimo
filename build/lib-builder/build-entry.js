var util = require('./util')
var getComponentFileNames = util.getComponentFileNames
var chalk = require('chalk')
var generateEntry = require('./generate-entry')

getComponentFileNames().then((fileNames) => {
  generateEntry(fileNames).then(() => {
    console.log(chalk.green(`[Lib-Builder] index.js build success!`))
  })
}, (err) => {
  throw err
})
