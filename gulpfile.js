'use strict';

const gulp = require('gulp');
const {
    series
} = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const headerComment = require('gulp-header-comment');


var paths = {
    modules: 'src/modules.scss',
    src: 'src/**/*.scss',
    dest: 'dist'
};

function clean(cb) {
    del('dist/**');
    cb();
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
    );
}


exports.default = series(clean, compileSass);