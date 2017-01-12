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
    files: [
           './img/',
           './*.ico',
           './*.txt',
           './*.html',
           './*.png',
           './*.xml'
    ],
    css:   './scss/main.scss',
    vendor: [
           './js/vendor/*.js'
    ],
    js: [
           './js/plugins.js',
           './js/main.js'
    ],
    img:   './img/**'
  },
  dist         = {
    root:  './site/',
    files: distFiles,
    css:   './site/css/',
    vendor:'./site/js/vendor',
    js:    './site/js/',
    img:   './site/img/'
  };

function distFiles() {
  return dev.files.map(function(f) {
    return dist.root + f.substr(2);
  });
}

gulp.task('scss', function() {
  return gulp
    .src(dev.css)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist.css));
});

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
  gulp.watch('./scss/**', ['scss']);
  gulp.watch(dev.js,      ['js']);
  gulp.watch(dev.img,     ['img']);
  gulp.watch(dev.files,   ['dist']);
  gulp.watch('./scss/**', browsersync.reload);
  gulp.watch(dev.js,      browsersync.reload);
  gulp.watch(dev.img,     browsersync.reload);
  gulp.watch(dev.files,   browsersync.reload);
});

gulp.task('server', function() {
  browsersync.init({
    server: {
      baseDir: dist.root,
      routes: {
        '/test' : 'js'
      }
    },
    port:   4000,
    notify: false,
    open:   false
  });
});

gulp.task('default', ['scss', 'js', 'img', 'dist', 'vendor', 'watch', 'server']);
