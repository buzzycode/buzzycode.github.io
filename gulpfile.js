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
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var minifyCSS = require('gulp-cssnano');



gulp.task('css', function() {
    return gulp.src('styles/**/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(bytediff.start())
            .pipe(size({
                showFiles: true
            }))
            .pipe(minifyCSS({
              zindex: false
            }))
            .pipe(bytediff.stop())
        .pipe(sourcemaps.write('.'))
        .pipe(size({
            showFiles: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('bundlejs', function(){
  return browserify({
    entries: 'static/index.js',
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
});

gulp.task('build', ['cleanup'], function(cb){
  runSequence('css',
    'bundlejs', 
    cb);
});

gulp.task('cleanup', function(){
  del('dist');
});

gulp.task('watch', ['build'], function(){
  //TODO: User task bundlejs and css.
  gulp.watch('static/**/*.js', ['bundlejs']);
  gulp.watch('styles/**/*.scss', ['css']);
});

gulp.task('default', ['watch']);