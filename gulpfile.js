'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var deploy = require('gulp-gh-pages');

gulp.task('deploy', function(){
  return gulp.src('scripts/**/*.js')
      .pipe(deploy());
});