/**
* Path for development
* @type {Object}
*/
const devPath = {
  nunjucks: './dev/*.html',
  fontIcon: './dev/assets/scss/icons/*.svg',
  fontIconTemplate: './dev/assets/scss/templates/_icons.scss',
  image: './dev/assets/images/*',
  style: './dev/**/*.scss',
  script: './dev/**/*.js' 
};

/**
* Path for dist
* @type {Object}
*/
const distPath = {
  build: './dist',
  image: './dist/assets/images',
  style: './dist/assets/css',
  script: './dist/assets/js'
};

/**
* Require modules
*/
const del = require('del'),
  gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  cleanCss = require('gulp-clean-css'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify'),
  browserSync  = require('browser-sync'),
  reload = browserSync.reload,
  nunjucks = require('gulp-nunjucks');

/**
* Clean build directory
*/
gulp.task('clean', function () {
  del.sync([distPath.build]);
});


/**
* Browser-Sync Task
*/
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./dev/"
        }
    });
});

/**
* Compile Nunjucks
*/
gulp.task('html', function() {
  return gulp.src(devPath.nunjucks)
  .pipe(nunjucks.compile())
  .pipe(gulp.dest(distPath.build))
  .pipe(reload({stream:true}));
});


/**
* Compile SASS
*/
gulp.task('sass', function() {
  return gulp.src(devPath.style)
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCss())
  .pipe(concat('app.min.css'))
  .pipe(gulp.dest(distPath.style))
  .pipe(browserSync.stream());
});

/**
* Minify and copy all JavaScript (except vendor scripts)
*/
gulp.task('script', function() {
  return gulp.src(devPath.script)
  .pipe(uglify())
  .pipe(concat('app.min.js'))
  .pipe(gulp.dest(distPath.script))
  .pipe(reload({stream:true}));
});

/**
* lint javascript
*/
gulp.task('lint', function() {
  return gulp.src(devPath.script)
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jshint.reporter('fail'))
  .pipe(reload({stream:true}));
});

/**
* Copy image resource
*/
gulp.task('images', function() {
  return gulp.src(devPath.image)
  .pipe(imagemin())
  .pipe(gulp.dest(distPath.image));
});

/*
* Serve task
*/
gulp.task('serve', ['clean', 'lint', 'html', 'sass', 'script', 'images'], function() {
  browserSync.init({
    server: {
      baseDir: distPath.build
    }
  });

  gulp.watch(devPath.nunjucks, ['html']);
  gulp.watch(devPath.style, ['sass']);
  gulp.watch(devPath.script, ['script']);
})

/**
* Default task
*/
gulp.task('default', ['clean', 'lint', 'html', 'sass', 'script', 'images']);