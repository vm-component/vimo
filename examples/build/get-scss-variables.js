/**
 * get theme from package.json
 * @return {Object} theme
 * */
var path = require('path')
var existsSync = require('fs').existsSync
var root = process.cwd()

/**
 * 获取业务定义的scss的变量
 * */
function getScssVariables () {
  const pkgPath = `${root}/package.json`
  const pkg = existsSync(pkgPath) ? require(pkgPath) : {}
  let data = null
  if (pkg.theme) {
    if (isString(pkg.theme)) {
      let sassImport = resolvePath(pkg.theme)
      data = `@charset "UTF-8"; @import ${sassImport};`
    } else if (isArray(pkg.theme)) {
      let sassImports = pkg.theme
      sassImports = sassImports.map((item) => resolvePath(item))
      data = `@charset "UTF-8"; @import ${sassImports.join(',')};`
    }
  }

  console.log('node-sass data:')
  console.log(data)

  return data
}

module.exports = getScssVariables()

  /**
 * @param {String} path - path of *.scss file
 * @example
 *
 * - example:
 * <rootDir>/examples/src/theme/variables.scss
 * /examples/src/theme/variables.scss
 * ./examples/src/theme/variables.scss
 *
 * - return:
 * rootDir/examples/src/theme/variables.scss
 *
 * */
function resolvePath (path) {

  if (path) {
    // <rootDir>
    if (path.indexOf('<rootDir>') === 0) {
      return `"${path.replace('<rootDir>', root).replace(/\\/g, '\\\\')}"`
    } else {
      return `"${resolve(path).replace(/\\/g, '\\\\')}"`
    }
  } else {
    return ''
  }
}

function resolve (dir) {
  return path.join(root, dir)
}

function isString (val) {
  return typeof val === 'string'
}

function isArray (obj) {
  return Array.isArray(obj)
}