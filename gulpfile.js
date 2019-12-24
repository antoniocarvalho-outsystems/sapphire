'use strict';

const pkg = require('./package.json');
const gulp = require('gulp');
const {
    series
} = require('gulp');
const del = require('del');
const exec = require('gulp-exec');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const bump = require('gulp-bump');
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
        gulp.src(paths.modules)
        .pipe(sass())
        .pipe(rename({
            basename: 'styles'
        }))
        .pipe(headerComment(`
        Version: ${pkg.version}
        Generated on <%= moment().format() %>
        `))
        .pipe(gulp.dest(paths.dest))
    );
}

function bumpVersion() {
    return (
        gulp.src('./package.json')
        .pipe(bump({
            type: 'patch',
            key: 'version'
        }))
        .pipe(gulp.dest('./'))
    )
}

function sendTag() {
    return (
        gulp.src('./**/**')
        .pipe(exec(`git push origin ${pkg.version}`))
    )
}

exports.default = series(clean, compileSass);
exports.bumpVersion = bumpVersion;
exports.sendTag = sendTag;