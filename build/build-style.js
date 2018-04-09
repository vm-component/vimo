/**
 * # 处理组件中的样式
 *
 * 组件的结构如下:
 *
 * 组件结构及功能: button.js = button.vue + utils + other.vue
 * 组件基础样式(独立入口): button.scss
 * 组件皮肤(每个都是独立入口): button.ios.scss / button.md.scss / button.xx.scss
 *
 * 这里进行组件样式处理, 包括以下处理步骤:
 *
 * es:
 * - 样式原样转移(*.scss)
 *
 * lib:
 * - scss -> css + uglify + sourcemaps
 *
 * */

// TODO: style for lib with postcss plugin!

var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('./build-config');
const { srcPath, esPath, libPath } = config;

gulp.task('lib:style', function () {
    return gulp.src(`${srcPath}/components/**/*.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`${libPath}/components/`));
});

gulp.task('es:style', function () {
    return gulp.src(`${srcPath}/components/**/*.scss`)
        .pipe(gulp.dest(`${esPath}/components/`));
});

gulp.start('lib:style');
gulp.start('es:style');
