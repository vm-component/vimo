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

//clean
gulp.task('clean-doc', del.bind(null, ['../docs/*']))

// jsdoc
gulp.task('make-doc', function (cb) {
  gulp.src('./', {read: false})
  .pipe(plumber())
  .pipe(jsdoc(jsdocConfig, cb))
})

gulp.task('reload', function () {
  reload()
})

gulp.task('refresh-doc', function () {
  runSequence('make-doc', 'reload')
})

// server
gulp.task('serve', function () {
  runSequence(['clean-doc'], ['make-doc'], function () {
    browserSync.init({
      notify: false,
      port: 8012,
      server: {
        baseDir: ['../docs/page', '../docs', './'],
        routes: {}
      }
    })
    gulp.watch([
      '../README.md',
      '../dev/raw/**/*.*'
    ], ['refreshDoc'])
  })
})

// 生成文档
gulp.task('publish', function (cb) {
  runSequence(['clean-doc'], ['make-doc'], cb)
})
