import gulp from 'gulp';

const { src, dest, series, watch, parallel } = gulp;

import autoprefixer from 'gulp-autoprefixer';
import cssMinify from 'gulp-clean-css';
import * as dartSass from 'sass';

import gulpSass from 'gulp-sass';
const scss = gulpSass(dartSass);

// JavaScript
import jsMinify from 'gulp-terser';

// Both 
import concat from 'gulp-concat';
import rename from 'gulp-rename';

import browserSyncLib from "browser-sync";
const browserSync = browserSyncLib.create();

// Paths
const paths = {
  styles: {
    src: 'src/scss/**/*.{scss,sass}',
    dest: 'public/css/',
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'public/js/',
  },
}

export function styles() {
  return src(paths.styles.src)
    .pipe(scss.sync().on('error', scss.logError))
    .pipe(autoprefixer('Last 2 versions'))
    .pipe(dest('public/css/'))
    .pipe(cssMinify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('public/css/'))
    .pipe(browserSync.stream());
}

export function scripts() {
  return src(paths.scripts.dest)
    .pipe(concat('scripts.js'))
    .pipe(dest('public/js'))
    .pipe(jsMinify())
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(dest('public/js'))
    .pipe(browserSync.stream());
}

export function serve() {
  browserSync.init({
    server: {
      baseDir: "./",
    }
  });

  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
}

export const build = series(
  parallel(styles, scripts)
)

export default series(build, serve);
