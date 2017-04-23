/**
 * @name gulpFile
 * @description
 * 这个是gulpFile自动化工具
 * */
let gulp = require('gulp')
let jsdoc = require('gulp-jsdoc3')
let babel = require('gulp-babel')
let del = require('del')
let gulpLoadPlugins = require('gulp-load-plugins')
const $ = gulpLoadPlugins();
const runSequence = require('run-sequence')
var bs = require('browser-sync')
var browserSync = bs.create()
const reload = browserSync.reload
let jsdocConfig = require('./jsdocConfig')
let plumber = require('gulp-plumber')

//clean
gulp.task('clean', del.bind(null, ['docs/page']))

// jsdoc
gulp.task('doc', function (cb) {
  gulp.src('./', {read: false})
    .pipe(plumber())
    .pipe(jsdoc(jsdocConfig, cb))
})

gulp.task('reload', function () {
  reload()
})

gulp.task('refreshDoc', function () {
  runSequence('doc', 'reload')
})

// server
gulp.task('serve', function () {
  runSequence(['clean'], ['doc'], function () {
    browserSync.init({
      notify: false,
      port: 8012,
      server: {
        baseDir: ['docs/page', 'docs', './'],
        routes: {}
      }
    })
    gulp.watch([
      'README.md',
      'src/vimo/**/*.*',
    ], ['refreshDoc'])
  })
})

// 生成文档
gulp.task('prepareBook', function (cb) {
  runSequence(['clean'], 'doc', cb)
})



//clean
gulp.task('clean-vimo', del.bind(null, ['publish/dist']))


// vimo发布
gulp.task('move-vimo',['clean-vimo'], function () {
  return gulp.src('./publish/src/**/**/*.*')
    .pipe(gulp.dest('./publish/dist'))
})

gulp.task('babel-vimo', ['move-vimo'], function () {
  gulp.src('./publish/dist/**/**/*.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe($.uglify())
    .pipe(gulp.dest('./publish/dist'))
})