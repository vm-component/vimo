/**
 * @name gulpFile
 * @description
 * 这个是gulpFile自动化工具
 * */
var gulp = require('gulp')
var jsdoc = require('gulp-jsdoc3')
var babel = require('gulp-babel')
var del = require('del')
var gulpLoadPlugins = require('gulp-load-plugins')
var $ = gulpLoadPlugins()
var runSequence = require('run-sequence')
var bs = require('browser-sync')
var browserSync = bs.create()
var reload = browserSync.reload
var jsdocConfig = require('./jsdoc-config.json')
var plumber = require('gulp-plumber')

// clean
// gulp.task('clean-doc', del.bind(['../docs/*'], {force: true}))
gulp.task('clean-doc', function (cb) {
  return del(['../docs/*'], {force: true})
})

// 移动资源
gulp.task('resource', function () {
  return gulp.src('./asset/**/**/*.*')
  .pipe(gulp.dest('../docs/asset'))
})

// jsdoc
gulp.task('make-doc', ['resource'], function (cb) {
  gulp.src('./', {read: false})
  .pipe(plumber())
  .pipe(jsdoc(jsdocConfig, cb))
})

// server
gulp.task('serve', function () {
  runSequence(['clean-doc'], ['make-doc'], function () {
    browserSync.init({
      notify: false,
      port: 8012,
      server: {
        baseDir: ['../docs'],
        routes: {}
      }
    })
    gulp.watch([
      '../README.md',
      '../dev/raw/**/*.*',
      '../docs-maker/theme/**/*.*',
    ], function () {
      runSequence('make-doc', function () {
        reload()
      })
    })
  })
})

// 生成文档
gulp.task('publish', function (cb) {
  runSequence(['clean-doc'], ['make-doc'], cb)
})
