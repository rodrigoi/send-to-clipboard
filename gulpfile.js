'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserify = require('browserify');
var transform = require('vinyl-transform');

var express = require('express');

var paths = {
  source:   'src/**/*.js',
  dist:     './dist/'
};

var ports = {
  server: 4200
};

gulp.task('clean', function (){
  gulp.src(paths.dist, {read:false})
    .pipe(plugins.rimraf());
});

gulp.task('scripts', function (){
  var browserified = transform(function(filename) {
    return browserify(filename)
      .require(filename, { expose: 'clipboard'})
      .bundle();
  });

  return gulp.src('./index.js')
    .pipe(browserified)
    .pipe(plugins.rename('clipboard.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('server', function (){
  gulp.src([
      './dist',
      './example'
    ])
    .pipe(plugins.webserver({
      livereload: true,
      host: '0.0.0.0',
      port: ports.server,
      open: true
    }));
});


gulp.task('default', ['clean', 'scripts', 'server']);
