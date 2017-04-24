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

//clean
gulp.task('clean', del.bind(null, ['publish']))

// vimo发布
gulp.task('copy', ['clean'], function () {

  gulp.src(['*.md', 'package.json'])
  .pipe(gulp.dest('publish'))


  return gulp.src('dev/raw/**/**/*.*')
  .pipe(gulp.dest('publish'))
})

gulp.task('babel', ['copy'], function () {
  gulp.src('publish/**/**/*.js')
  .pipe(babel({presets: ['es2015']}))
  .pipe($.uglify())
  .pipe(gulp.dest('publish'))
})