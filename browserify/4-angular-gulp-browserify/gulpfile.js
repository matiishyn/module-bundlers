var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	connect = require('gulp-connect');

var browserify = require('browserify'),
	source = require('vinyl-source-stream');


// Connect task
gulp.task('connect', function() {
	connect.server({
		root: 'public',
		port: 4000
	});
});

gulp.task('browserify', function() {
	// get app.js
	return browserify('./app/app.js')
		// bundle it and create main.js
		.bundle()
		.pipe(source('main.js'))
		// save to public/js/ directory
		.pipe(gulp.dest('./public/js/'))
});