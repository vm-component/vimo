/**
 * 在Github上创建release记录
 * - 使用的Angular风格
 * - auth文件不能上传, 如果是在TravisCI上, 需要设置GH_TOKEN变量
 * - 根据以往commit的记录生成Release说明, 例如: https://github.com/vm-component/vm-test/releases
 * - tag自动标记, 不需要: git push --follow-tags
 * */
var conventionalGithubReleaser = require('conventional-github-releaser')
var chalk = require('chalk')

var version = require('../package.json').version
var name = require('../package.json').name

console.log(chalk.cyan('-------------------------------------------'))
console.log(chalk.cyan(`Releasing the ${name}@${version} to the Gituhub...`))
console.log(chalk.cyan('-------------------------------------------'))

conventionalGithubReleaser({
  type: 'oauth',
  // change this to your own GitHub token or use an environment
  token: process.env.GH_TOKEN
}, {
  preset: 'angular'
}, function () {
  console.log(chalk.cyan('--------------------------'))
  console.log(chalk.cyan('Github Releasing complete.'))
  console.log(chalk.cyan('--------------------------'))
})
