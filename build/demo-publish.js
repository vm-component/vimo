const {cd, exec, touch} = require('shelljs')
const {readFileSync} = require('fs')

var chalk = require('chalk')

console.log(chalk.cyan('---------------------------------------'))
console.log(chalk.cyan('Deploying demo on vimo-demo:gh-pages...'))
console.log(chalk.cyan('---------------------------------------'))

let repoUrl
let pkg = JSON.parse(readFileSync('package.json'))
if (typeof pkg.demo === 'object') {
  if (!pkg.demo.hasOwnProperty('url')) {
    throw new Error('URL does not exist in repository section')
  }
  repoUrl = pkg.demo.url
} else {
  repoUrl = pkg.demo
}

let ghToken = process.env.GH_TOKEN
let remoteGitStore = `https://${ghToken}@github.com/${repoUrl.split(':')[1]}`

cd('./examples/dist')
touch('.nojekyll')
exec('git init')
exec('git add .')
exec('git config user.name "nostaff"')
exec('git config user.email "nostaff@sina.com"')
exec('git commit -m "docs(demo): update demo"')
exec(
  `git push --force --quiet "${remoteGitStore}" master`
)

console.log(chalk.cyan('---------------'))
console.log(chalk.cyan('Demo deployed!!'))
console.log(chalk.cyan('---------------'))
