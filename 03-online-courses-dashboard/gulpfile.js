const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const bs = require('browser-sync').create()
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')

const style = () =>
  gulp
    .src('./scss/main.scss')
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(bs.stream())

const watch = () => {
  bs.init({
    server: { baseDir: './' },
  })
  gulp.watch('./scss/**/*.scss', style)
  gulp.watch('./**').on('change', bs.reload)
}

exports.style = style
exports.watch = watch
exports.default = watch
