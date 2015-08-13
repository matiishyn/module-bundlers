var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server({
		root: 'public',
		port: 4000
	});
});