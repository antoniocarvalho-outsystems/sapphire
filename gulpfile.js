'use strict';

const gulp = require('gulp');
const { series, watch } = require('gulp');
const bump = require('gulp-bump');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const headerComment = require('gulp-header-comment');
const fs = require('fs');
const del = require('del');
const exec = require('child_process').exec;
const app = require('https-localhost')();

const PATHS = {
	imports: 'src/imports.scss',
	dest: 'dist',
};

const clean = cb => {
	del('dist/**');

	cb();
};

const compileSass = () =>
	gulp
		.src(PATHS.imports)
		.pipe(
			sass({
				outputStyle: 'nested',
				sourceComments: false,
			})
		)
		.pipe(
			rename({
				basename: 'styles',
			})
		)
		.pipe(
			headerComment(`
        Version <%= pkg.version %>
        Generated on <%= moment().format() %>
    `)
		)
		.pipe(gulp.dest(PATHS.dest));

const bumpVersion = () =>
	gulp
		.src(['./package.json'])
		.pipe(
			bump({
				type: 'patch',
				key: 'version',
			})
		)
		.pipe(gulp.dest('./'));

const addFiles = cb => exec(`git add .`, cb);
const commitFiles = cb => exec(`git commit -am.`, cb);

const createTag = cb => {
	const pkg = JSON.parse(fs.readFileSync('./package.json'));
	exec(`git tag ${pkg.version}`, cb);
};

const pushTag = cb => {
	const pkg = JSON.parse(fs.readFileSync('./package.json'));
	exec(`git push origin ${pkg.version}`, cb);
};

const watchSass = () => watch('src/**/*.scss', series(clean, compileSass));

const server = cb => {
	app.serve('dist/');

	cb();
};

exports.default = series(clean, compileSass, server, watchSass);
exports.newtag = series(
	bumpVersion,
	compileSass,
	addFiles,
	commitFiles,
	createTag,
	pushTag
);
