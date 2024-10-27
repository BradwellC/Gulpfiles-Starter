// import { src, dest, series, watch } from 'gulp';

import gulp from 'gulp';

const { src, dest, series, watch } = gulp;

// SCSS
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cssMinify from 'gulp-clean-css';
import * as sass from 'sass';
const scss = gulpSass(sass);


// JavaScript
import jsMinify from 'gulp-terser';


// Both 
import concat from 'gulp-concat';
import rename from 'gulp-rename';


// CSS Gulp

function styles() {
  return src('Library/styles/**/*.scss')
    .pipe( scss() )
    .pipe( autoprefixer( 'Last 2 versions' ) )
    .pipe(dest('public/css/'))
    .pipe( cssMinify() )
    .pipe( rename({
      suffix: '.min'
    }) )
    .pipe(dest('public/css/'))
}

// JS Gulp

function scripts() {
  return src('Library/scripts/**/*.js') 
    .pipe(concat('scripts.js'))
    .pipe(dest('public/js'))
    .pipe(jsMinify())
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(dest('public/js'));
}

// Watch Gulp
function watchGulp() {
  watch('Library/scripts/**/*.js', series(scripts));
  watch('Library/styles/**/*.scss', series(styles));
}

export default series(styles, scripts, watchGulp);
