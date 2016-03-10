var gulp         = require('gulp')
var path         = require('path')
var less         = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')
var sourcemaps   = require('gulp-sourcemaps')
var minifyCSS    = require('gulp-minify-css')
var rename       = require('gulp-rename')
var concat       = require('gulp-concat')
var uglify       = require('gulp-uglify')
var connect      = require('gulp-connect')
var open         = require('gulp-open')

var Paths = {
  HERE                 : './',
  LESS                 : './less/bootstrap-datetimepicker.less',
  DIST                 : './dist/datetime/css'
}

gulp.task('default', ['less', 'less-min'])

gulp.task('less', function () {
  return gulp.src(Paths.LESS)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest(Paths.DIST))
})

gulp.task('less-min', ['less'], function () {
  return gulp.src(Paths.LESS)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(autoprefixer())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(Paths.DIST))
})
