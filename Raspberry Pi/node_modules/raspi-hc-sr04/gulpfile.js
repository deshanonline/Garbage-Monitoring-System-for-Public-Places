const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

function clean() {
  return del(['lib']);
}

function lint() {
  return gulp.src('index.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function build() {
  return gulp.src('index.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('lib'));
}

exports.clean = clean;
exports.lint = lint;
exports.default = gulp.series(clean, lint, build);
