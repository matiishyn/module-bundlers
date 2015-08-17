var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');

gulp.task('script', function() {
	var sources = browserify({
		entries: 'src/scripts/app.js',
		debug: true
	})
	.transform(babelify.configure());

	return sources.bundle()
		.pipe(vinylSourceStream('app.min.js'))
		.pipe(vinylBuffer())
		.pipe(gulp.dest('src/scripts/'));
});