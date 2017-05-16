var gulp = require('gulp');
	sass = require('gulp-sass'),
	jshint = require('gulp-jshint'),
 	clean = require('gulp-clean'),
 	concat = require('gulp-concat'),
 	uglify = require('gulp-uglify'),
 	es = require('event-stream'),
 	browserSync  = require('browser-sync'),
	reload      = browserSync.reload,
 	cleanCSS = require('gulp-clean-css'),
 	runSequence = require('run-sequence'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber');

var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: './public'
    });
});

// WEBPACK DEV
gulp.task('webpack', function(callback) {
    return gulp.src('./app/app.jsx')
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest('./public'))
		.pipe(reload({stream:true}));
});

// return é para tornar assincrona
gulp.task('clean', function () {
	return gulp.src('public/dist/')
	.pipe(clean());
});

// task para o sass/css
gulp.task('sass', function() {
	return es.merge([
		gulp.src(['public/sass/*.sass'])
		])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(concat('styles.min.css'))
    .pipe(gulp.dest('public/dist/css'))
	.pipe(reload({stream:true}));
});

gulp.task('watch', function(){
	gulp.watch('public/sass/**/*.sass', ['sass']);
	gulp.watch('app/**/*.jsx', ['webpack']);
});

gulp.task('jshint', function () {
	return gulp.src('public/js/**/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

/* p.task('htmlmin', function () {
	return gulp.src('view/*.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest(''))
});

gulp.task('copy', function () {
	return gulp.src('index.html')
	.pipe(gulp.dest(''));
}); */

gulp.task('default', function (cb) {
	return runSequence('clean', ['webpack', 'sass', 'watch', 'browser-sync'], cb)
});
