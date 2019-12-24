'use strict';

const gulp = require('gulp');
const {
    series
} = require('gulp');
const del = require('del');
const exec = require('child_process').exec;
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const bump = require('gulp-bump');
const headerComment = require('gulp-header-comment');
const fs = require('fs');

var paths = {
    imports: 'src/imports.scss',
    dest: 'dist'
};

function clean(cb) {
    del('dist/**');
    cb();
}

function compileSass() {
    return (
        gulp.src(paths.imports)
        .pipe(sass())
        .pipe(rename({
            basename: 'styles'
        }))
        .pipe(headerComment(`
        Version <%= pkg.version %>
        Generated on <%= moment().format() %>
        `))
        .pipe(gulp.dest(paths.dest))
    );
}

function bumpVersion() {
    return (
        gulp.src(['./package.json'])
        .pipe(bump({
            type: 'patch',
            key: 'version'
        }))
        .pipe(gulp.dest('./'))
    )
}

function addFiles(cb) {
    exec(`git add .`, cb);
};

function commitFiles(cb) {
    exec(`git commit -am.`, cb);
};

function createTag(cb) {
    var pkg = JSON.parse(fs.readFileSync('./package.json'));
    exec(`git tag ${pkg.version}`, cb);
};

function pushTag(cb) {
    var pkg = JSON.parse(fs.readFileSync('./package.json'));
    exec(`git push origin ${pkg.version}`, cb);
};

exports.default = series(clean, compileSass);
exports.newtag = series(bumpVersion, compileSass, addFiles, commitFiles, createTag, pushTag);