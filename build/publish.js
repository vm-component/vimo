/**
 * @name gulpFile
 * @description
 * 这个是gulpFile自动化工具
 * */
var gulp = require('gulp')
var babel = require('gulp-babel')
var del = require('del')
var gulpLoadPlugins = require('gulp-load-plugins')
var $ = gulpLoadPlugins()

// clean
gulp.task('clean', del.bind(null, ['../lib'], {
  force: true
}))

// vimo发布
gulp.task('copy', ['clean'], function () {
  return gulp.src('../components/**/**/*.*')
  .pipe(gulp.dest('../lib'))
})

// gulp.task('babel', ['copy'], function () {
//   gulp.src([
//     '../publish/**/**/*.js'
//   ])
//   .pipe(babel({presets: ['es2015']}))
//   .pipe($.uglify())
//   .pipe(gulp.dest('../publish'))
// })