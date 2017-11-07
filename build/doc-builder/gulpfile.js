/**
 * @name gulpFile
 * @description
 * 这个是gulpFile自动化工具
 * */
var path = require('path')
var gulp = require('gulp')
var jsdoc = require('gulp-jsdoc3')
var del = require('del')
var gulpLoadPlugins = require('gulp-load-plugins')
var $ = gulpLoadPlugins()
var runSequence = require('run-sequence')
var bs = require('browser-sync')
var browserSync = bs.create()
var reload = browserSync.reload
var jsdocConfig = require('./config')
var plumber = require('gulp-plumber')
var chalk = require('chalk')
var base = path.resolve(__dirname, '../../')
var docPath = `${base}/docs`

// clean
// gulp.task('clean-doc', del.bind(['../docs/*'], {force: true}))
gulp.task('clean', function (cb) {
  return del([docPath], {force: true})
})

// 移动资源
gulp.task('resource', function () {
  return gulp.src('./asset/**/**/*.*')
  .pipe(gulp.dest(`${docPath}/asset`))
})

// jsdoc
gulp.task('make', ['resource'], function (cb) {
  gulp.src([`${base}`], {read: false})
  .pipe(plumber())
  .pipe(jsdoc(jsdocConfig, cb))
})

// server
gulp.task('default', function () {
  runSequence(['clean'], ['make'], function () {
    browserSync.init({
      notify: false,
      port: 8012,
      server: {
        baseDir: [`${docPath}`],
        routes: {}
      }
    })
    gulp.watch([
      `${base}/README.md`,
      `${base}/src/components/**/*.*`,
      './theme/**/*.*'
    ], function () {
      runSequence('make', function () {
        reload()
      })
    })
  })
})

// 生成文档
gulp.task('build', function () {
  console.log(chalk.cyan('-------------------'))
  console.log(chalk.cyan('Build Docs start...'))
  console.log(chalk.cyan('-------------------'))
  runSequence(['clean'], ['make'], function () {
    console.log(chalk.cyan('--------------------'))
    console.log(chalk.cyan('Build Docs complete.'))
    console.log(chalk.cyan('--------------------'))
  })
})
