import { dest, src, watch, parallel } from 'gulp';
import babel from 'gulp-babel';

import * as sass from 'sass';
import gulpSass from 'gulp-sass';
const scss = gulpSass(sass);


import autoprefixer from 'gulp-autoprefixer';
import cssMinfy from 'gulp-clean-css';

import concat from 'gulp-concat';
import rename from 'gulp-rename';

// CSS Gulp

function styles() {
  return src('Library/styles/**/*.scss')
    .pipe(scss())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 2 versions', '> 1%'], // Adjust the browser support according to your needs
        cascade: false,
      })
    )
    .pipe(dest('public/css'))
    .pipe(cssMinfy())
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(dest('public/css'));
}

// JS Gulp
import jsMinfy from 'gulp-terser';

function scripts() {
  return src('Library/scripts/**/*.js')
    .pipe(babel(
      {
        presets: ['@babel/preset-env']
      }
    ))
    .pipe(concat('scripts.js'))
    .pipe(dest('public/js'))
    .pipe(jsMinfy())
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(dest('public/js'));
}

// Watch Gulp
function watchGulp() {
  watch(
    [
      'Library/styles/**/*.scss',
      'Library/scripts/**/*.js',
    ],
    parallel(styles, scripts)
  );
}

export default parallel(styles, scripts, watchGulp);
