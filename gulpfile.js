let gulp = require('gulp');
let jsdoc = require('gulp-jsdoc3');
let del = require('del');
let config = require('./jsdocConfig');
const runSequence = require('run-sequence');
var bs = require("browser-sync");
var browserSync = bs.create();
const reload = browserSync.reload;
let cache = require('gulp-cache');

let srcCode = ['./src/vimo/components/**/index.js'];
//clean
gulp.task('clean', del.bind(null, ['docs']));

// jsdoc
gulp.task('doc', function (cb) {
  gulp.src(['README.md'].concat(srcCode), {read: false})
    .pipe(jsdoc(config, cb));
  reload();
});

// server
gulp.task('serve', function () {
  runSequence(['clean'], ['doc'], function () {
    browserSync.init({
      notify: false,
      port: 8011,
      server: {
        baseDir: ['docs'],
        routes: {}
      }
    });
    gulp.watch([
      'README.md',
      'src/vimo/**/*.js',
    ], ['doc']);
  });
});

gulp.task('default', function (cb) {
  runSequence('doc', cb);
});

gulp.task('publish', function (cb) {
  let runSequence = require('run-sequence');
  runSequence('doc', cb);
});
