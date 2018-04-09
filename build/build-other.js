/**
 * 其余边角部分处理
 *
 * - *.md文档转移到 es/lib 目录
 * - theme 文件夹转移到 es 目录
 * - utils 文件夹转移到 es 目录
 * - mixins 文件夹转移到 es 目录
 * - 看下是否能生成*.d.ts文件? 不可以
 *
 * */

var gulp = require('gulp');
var config = require('./build-config');
const { srcPath, esPath, libPath } = config;

gulp.task('move:md', function () {
    return gulp.src(`${srcPath}/components/**/*.md`)
        .pipe(gulp.dest(`${esPath}/components/`))
        .pipe(gulp.dest(`${libPath}/components/`));
});

gulp.task('move:theme', function () {
    return gulp.src(`${srcPath}/themes/**/*.scss`)
        .pipe(gulp.dest(`${esPath}/themes/`));
});

gulp.task('move:util', function () {
    return gulp.src([`${srcPath}/util/**/*.*`, `!${srcPath}/util/__tests__/*.*`, `!${srcPath}/util/backup/*.*`])
        .pipe(gulp.dest(`${esPath}/util/`));
});

gulp.task('move:mixins', function () {
    return gulp.src([`${srcPath}/mixins/**/*.*`, `!${srcPath}/mixins/__tests__/*.*`, `!${srcPath}/mixins/backup/*.*`])
        .pipe(gulp.dest(`${esPath}/mixins/`));
});

gulp.start('move:md');
gulp.start('move:theme');
gulp.start('move:util');
gulp.start('move:mixins');
