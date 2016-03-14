/* Dependencies */
var gulp         = require('gulp')
var path         = require('path')
var less         = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')
var minifyCSS    = require('gulp-minify-css')
var rename       = require('gulp-rename')
var concat       = require('gulp-concat')
var uglify       = require('gulp-uglify')
var clean        = require('gulp-clean')
var argv         = require('yargs').argv;

/* Paths variables */
var Paths = {
  HERE                 : './',
  TEMPLATE             : './global/template',
  DIST_BS              : 'dist/bootstrap',
  DIST_TK              : 'dist/toolkit',
  DIST_BS_CSS          : 'bootstrap.css',
  DIST_BS_MIN_CSS      : 'bootstrap.min.css',
  GLOBAL_BUILD         : './global/build.less',
  BUILD                : 'build.less',
  LESS                 : 'less/bootstrap-datetimepicker.less',
  LESS_TK              : 'less/toolkit.less',
  DIST                 : 'dist/datetime/css',
  DISTJS               : 'dist/datetime/js',
  JS                   : 'js/*.js',
  THEMES               : [
                          'atlas'
                        ]
}

var themeName = argv.t;
var theme = themeName + "/";

gulp.task('default', ['clean-build','less-tk-min','less-dt-min','js-min'])

/* TODO: Check to make sure the theme is valid and exists */
gulp.task('validation', function () {
  return true;
})

/* Copy the build.less file to the theme from global */
gulp.task('copy-build', ['validation'], function () {
  return gulp.src(Paths.GLOBAL_BUILD)
    .pipe(gulp.dest(theme))
})

/* Run the build to build the custom bootstrap.css */
gulp.task('less', ['copy-build'], function () {
  return gulp.src(theme + Paths.BUILD)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(rename(Paths.DIST_BS_CSS))
    .pipe(gulp.dest(theme + Paths.DIST_BS))
})

/* Create a minified version of the bootstrap.css */
gulp.task('less-min', ['less'], function () {
  return gulp.src(theme + Paths.BUILD)
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(autoprefixer())
    .pipe(rename({
      basename: 'bootstrap',
      suffix: '.min'
    }))
    .pipe(gulp.dest(theme + Paths.DIST_BS))
})

/* Remove the build.less file from the theme root */
gulp.task('clean-build', ['less-min'], function () {
  return gulp.src(theme + "*.less")
		.pipe(clean())
})

/* Build the toolkit */
gulp.task('less-tk', function () {
  return gulp.src(theme + Paths.LESS_TK)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(rename(themeName + '.toolkit.css'))
    .pipe(gulp.dest(theme + Paths.DIST_TK))
})

/* Create a minified version of the toolkit */
gulp.task('less-tk-min', ['less-tk'], function () {
  return gulp.src(theme + Paths.LESS_TK)
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(autoprefixer())
    .pipe(rename({
      basename: themeName + '.toolkit',
      suffix: '.min'
    }))
    .pipe(gulp.dest(theme + Paths.DIST_TK))
})

/* Build the datetime picker */
gulp.task('less-dt', function () {
  return gulp.src(theme + Paths.LESS)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(rename('bootstrap.datetimepicker.css'))
    .pipe(gulp.dest(theme + Paths.DIST))
})

/* Create a minified version of the datetime picker */
gulp.task('less-dt-min', ['less-dt'], function () {
  return gulp.src(theme + Paths.LESS)
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(autoprefixer())
    .pipe(rename({
      basename: 'bootstrap.datetimepicker',
      suffix: '.min'
    }))
    .pipe(gulp.dest(theme + Paths.DIST))
})

/* Copy the datetime javascript to the dist folder */
gulp.task('js', function () {
  return gulp.src(theme + Paths.JS)
    .pipe(concat('bootstrap.datetimepicker.js'))
    .pipe(gulp.dest(theme + Paths.DISTJS))
})

/* Minify the datetime javascript */
gulp.task('js-min', ['js'], function () {
  return gulp.src(theme + Paths.JS)
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(theme + Paths.DISTJS))
})

/* Create a new theme based on a global placeholder template */
gulp.task('add-theme', function () {
  return gulp.src(Paths.TEMPLATE + "/**/*")
    .pipe(gulp.dest(Paths.HERE + theme))
})
