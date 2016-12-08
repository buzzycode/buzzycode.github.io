'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var bytediff= require('gulp-bytediff');
var size = require('gulp-size');

function bundlejs(){
  var b = browserify({
    entries: 'scripts/index.js',
    debug: true
  })
  .bundle()
  .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
          .pipe(bytediff.start())
          .pipe(uglify())
          .pipe(bytediff.stop())
      .pipe(sourcemaps.write('.'))
      .pipe(size({
          showFiles: true
      }))
      .pipe(gulp.dest('dist')); 
}

gulp.task('cleanup', function(){
  del('dist');
});

gulp.task('default', ['cleanup'],  bundlejs);