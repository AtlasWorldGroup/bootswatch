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
var replace      = require('gulp-replace')
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
  DTJS                 : 'js/bootstrap.datetimepicker.js',
  MOMENT               : 'js/moment.js',
  THEMES               : [
                          'atlas'
                        ]
}

var themeName = argv.t;
var theme = './' + themeName + "/";

gulp.task('default', ['clean-tmp','less-tk-min','less-dt-min','js-moment-min'])

/* TODO: Check to make sure the theme is valid and exists (possibly using Paths.THEMES?) */
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
    .pipe(gulp.dest(theme + Paths.DIST_BS + "/tmp"))
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
    .pipe(gulp.dest(theme + Paths.DIST_BS + "/tmp"))
})

/* change any http:// to https:// */
gulp.task('https', ['less-min'], function () {
  return gulp.src([theme + Paths.DIST_BS + "/tmp/bootstrap.css"])
    .pipe(replace('http:', 'https:'))
    .pipe(gulp.dest(theme + Paths.DIST_BS))
})

gulp.task('https-min', ['https'], function () {
  return gulp.src([theme + Paths.DIST_BS + '/tmp/bootstrap.min.css'])
    .pipe(replace('http:', 'https:'))
    .pipe(gulp.dest(theme + Paths.DIST_BS))
})

/* Remove the build.less file from the theme root */
gulp.task('clean-build', ['https-min'], function () {
  return gulp.src(theme + '*.less')
		.pipe(clean())
})

/* Remove tmp */
gulp.task('clean-tmp', ['clean-build'], function () {
  return gulp.src(theme + Paths.DIST_BS + '/tmp')
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
  return gulp.src(theme + Paths.DTJS)
    .pipe(gulp.dest(theme + Paths.DISTJS))
})

/* Minify the datetime javascript */
gulp.task('js-min', ['js'], function () {
  return gulp.src(theme + Paths.DTJS)
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(theme + Paths.DISTJS))
})

/* Copy Moment.js */
gulp.task('js-moment', ['js-min'], function () {
  return gulp.src(theme + Paths.MOMENT)
  .pipe(gulp.dest(theme + Paths.DISTJS))
})

/* Minify the moment javascript */
gulp.task('js-moment-min', ['js-moment'], function () {
  return gulp.src(theme + Paths.MOMENT)
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
