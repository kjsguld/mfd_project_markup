var
  // modules
  gulp = require('gulp'),
  newer = require('gulp-newer'),
  imagemin = require('gulp-imagemin'),
  cleanhtml = require('gulp-cleanhtml'),
  sass = require('gulp-sass'),

  // development mode?
  devBuild = false,

  // folders
  folder = {
    src: 'src/',
    build: 'build/'
  }
;

// image processing
gulp.task('images', function() {
  var out = folder.build + 'images/';
  return gulp.src(folder.src + 'images/**/*')
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out));
});


// HTML processing
gulp.task('html', ['images'], function() {
  var
    out = folder.build + 'html/',
    page = gulp.src(folder.src + 'html/**/*')
      .pipe(newer(out));

  // minify production code
  if (!devBuild) {
    page = page.pipe(cleanhtml());
  }

  return page.pipe(gulp.dest(out));
});

// CSS processing
gulp.task('css', ['images'], function() {

  return gulp.src(folder.src + 'scss/main.scss')
    .pipe(sass({
      outputStyle: 'nested',
      imagePath: 'images/',
      precision: 3,
      errLogToConsole: true
    }))
    .pipe(gulp.dest(folder.build + 'css/'));

});

// watch for changes
gulp.task('watch', function() {

  // image changes
  gulp.watch(folder.src + 'images/**/*', ['images']);

  // html changes
  gulp.watch(folder.src + 'html/**/*', ['html']);

  // css changes
  gulp.watch(folder.src + 'scss/**/*', ['css']);

});
