var path = require('path')
var gulp = require('gulp')
var del = require('del')
var gulpLoadPlugins = require('gulp-load-plugins')
var $ = gulpLoadPlugins()
var runSequence = require('run-sequence')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// 清理lib
gulp.task('clean', function () {
  return del([resolve('lib/*')], {force: true})
})

// 移动资源
gulp.task('resource', function () {
  return gulp.src(resolve('components/**/**/*.*'))
  .pipe(gulp.dest(resolve('lib')))
})

// babel编译
gulp.task('babel', function () {
  return gulp.src(resolve('lib/**/**/*.js'))
  .pipe($.babel({
    presets: ['env']
  }))
  // .pipe($.uglify())
  .pipe(gulp.dest(resolve('lib')))
})

gulp.task('default', function () {
  runSequence(['clean'], ['resource'], ['babel'], function () {})
})
