
/**
 * @name gulpFile
 * @description
 * 这个是gulpFile自动化工具
 * */
let gulp = require('gulp');
let jsdoc = require('gulp-jsdoc3');
let del = require('del');
const runSequence = require('run-sequence');
var bs = require("browser-sync");
var browserSync = bs.create();
const reload = browserSync.reload;
let cache = require('gulp-cache');
let jsdocConfig = require('./jsdocConfig');
let plumber = require('gulp-plumber');

//clean
gulp.task('clean', del.bind(null, ['docs']));

// jsdoc
gulp.task('doc', function (cb) {
  gulp.src('./', {read: false})
    .pipe(plumber())
    .pipe(jsdoc(jsdocConfig, cb));
});

gulp.task('reload', function () {
  reload();
})

gulp.task('refreshDoc', function () {
  runSequence('doc', 'reload');
})

// server
gulp.task('serve', function () {
  runSequence(['clean'], ['doc'], function () {
    browserSync.init({
      notify: false,
      port: 8012,
      server: {
        baseDir: ['docs'],
        routes: {}
      }
    });
    gulp.watch([
      'README.md',
      'src/vimo/**/*.*',
    ], ['refreshDoc']);
  });
});

gulp.task('default', function (cb) {
  runSequence('doc', cb);
});

gulp.task('publish', function (cb) {
  let runSequence = require('run-sequence');
  runSequence('doc', cb);
});
