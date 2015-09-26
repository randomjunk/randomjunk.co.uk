
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var del = require('del');

var target = './target/www/';

gulp.task('browserify', function() {
  return browserify('./src/js/main.js')
    .transform(babelify.configure({nonStandard: true}))
    .bundle()
    .pipe(source('site.js'))
    .pipe(gulp.dest(target + "js/"));
});

gulp.task('copy-resources', function() {
  gulp.src('./src/**/*.html').pipe(gulp.dest(target));
  gulp.src('./src/images/*.svg').pipe(gulp.dest(target + 'images/'))
});

gulp.task('watch', function() {
  gulp.watch(['./src/js/**'], ['browserify']);
  gulp.watch(['./src/**/*.html', './src/images/**'], ['copy-resources']);
});

gulp.task('clean', function() {
  del([target+'**']);
});

gulp.task('default', ['copy-resources', 'browserify']);
