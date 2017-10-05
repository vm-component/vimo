require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config/index')
var webpackConfig = require('./webpack.prod.conf')

console.log(chalk.cyan('----------------------'))
console.log(chalk.cyan('  Build demo start...'))
console.log(chalk.cyan('----------------------'))

var spinner = ora('building for production...')
spinner.start()
let assetsSubDirectory = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm(assetsSubDirectory, err => {
  if (err) throw err
  webpack(webpackConfig, function (err) {
    spinner.stop()
    if (err) throw err
    console.log(chalk.cyan('----------------------'))
    console.log(chalk.cyan('  Build demo complete.'))
    console.log(chalk.cyan('----------------------'))
  })
})
