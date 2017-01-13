var
  autoprefixer = require('gulp-autoprefixer'),
  browsersync  = require('browser-sync').create(),
  concat       = require('gulp-concat'),
  del          = require('del'),
  gulp         = require('gulp'),
  imagemin     = require('gulp-imagemin'),
  sass         = require('gulp-sass'),
  sourcemaps   = require('gulp-sourcemaps'),
  uglify       = require('gulp-uglify'),
  dev          = {
    files: ['./dev/img/',],
    vendor: [
           './dev/js/vendor/*.js'
    ],
    js: [
           './dev/js/src/connection.js',
           './dev/js/src/helpers.js',
           './dev/js/src/ep.js',
           './dev/js/src/sources.js',
           './dev/js/src/x2y.js',
           './dev/js/src/views.js',
           './dev/js/plugins.js',
           './dev/js/main.js'
    ],
    img:   './dev/img/**'
  },
  dist         = {
    root:  './',
    files: distFiles,
    vendor:'./javascripts/vendor',
    js:    './javascripts/',
    img:   './images/'
  };

function distFiles() {
  return dev.files.map(function(f) {
    return dist.root + f.substr(2);
  });
}

gulp.task('js', function() {
  return gulp
    .src(dev.js)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist.js));
});

gulp.task('img', function() {
  gulp
    .src(dev.img)
    // .pipe(cache(imagemin()))
    .pipe(imagemin())
    .pipe(gulp.dest(dist.img));
});

gulp.task('clean', function () {
  del.sync(dist.files());
});

gulp.task('dist', ['clean'], function () {
  return gulp
    .src(dev.files)
    .pipe(gulp.dest(dist.root));
});

gulp.task('vendor', function () {
  return gulp
  .src(dev.vendor)
  .pipe(gulp.dest(dist.vendor));
});

gulp.task('watch', function() {
  gulp.watch(dev.js,      ['js']);
  gulp.watch(dev.img,     ['img']);
  gulp.watch(dev.files,   ['dist']);
  gulp.watch(dev.js,      browsersync.reload);
  gulp.watch(dev.img,     browsersync.reload);
  gulp.watch(dev.files,   browsersync.reload);
});

gulp.task('server', function() {
  browsersync.init({
    server: {
      baseDir: '_site',
      routes: {
        '/test' : 'js'
      }
    },
    port:   4000,
    notify: false,
    open:   false
  });
});

gulp.task('build',   ['js', 'dist', 'vendor']);
gulp.task('default', ['js', 'dist', 'vendor', 'watch', 'server']);
gulp.task('serve',   ['watch', 'server']);
