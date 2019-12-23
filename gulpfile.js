'use strict';

const gulp = require('gulp');
const {
    series
} = require('gulp');
const browserSync = require("browser-sync").create();
const del = require('del');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const headerComment = require('gulp-header-comment');


var paths = {
    modules: 'src/modules.scss',
    src: 'src/**/*.scss',
    dest: 'dist'
};

function reload(done) {
    browserSync.reload();
    done();
}

function compileSass() {
    return (
        gulp
        .src(paths.modules)
        .pipe(sass())
        .pipe(rename({
            basename: 'styles'
        }))
        .pipe(headerComment(`Generated on <%= moment().format() %>`))
        .pipe(gulp.dest(paths.dest))
        .pipe(browserSync.stream())
    );
}

function watch() {
    browserSync.init({
        open: 'external',
        proxy: 'atc-dev.outsystemsenterprise.com/StyleguideBo_UI',
    });
    gulp.watch(paths.src, series(clean, compileSass));
}

function clean(cb) {
    del('dist/**');
    cb();
}

exports.default = series(clean, compileSass);
exports.watch = watch;