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

var base = path.resolve(__dirname, '../../')

// clean
// gulp.task('clean-doc', del.bind(['../docs/*'], {force: true}))
gulp.task('clean', function (cb) {
  return del([`${base}/docs`], {force: true})
})

// 移动资源
gulp.task('resource', function () {
  return gulp.src('./asset/**/**/*.*')
  .pipe(gulp.dest(`${base}/docs/asset`))
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
        baseDir: [`${base}/docs`],
        routes: {}
      }
    })
    gulp.watch([
      `${base}/README.md`,
      `${base}/components/**/*.*`,
      './theme/**/*.*'
    ], function () {
      runSequence('make', function () {
        reload()
      })
    })
  })
})

// transfer demo
gulp.task('transfer-demo', function () {
  gulp.src([`${base}/examples/dist/**/**/*.*`])
  .pipe(gulp.dest(`${base}/docs/demo`))
})

// 生成文档
gulp.task('build', function (cb) {
  runSequence(['clean'], ['make'], ['transfer-demo'], cb)
})

// // test
// gulp.task('docs', function () {
//   const fs = require('fs-then-native')
//   const jsdoc2md = require('jsdoc-to-markdown')
//   return jsdoc2md.render({
//     files: `${base}/components/action-sheet/*.*`,
//     configure: './conf.json'
//   })
//   .then(output => fs.writeFile(`${base}/components/action-sheet/api.md`, output))
// })
