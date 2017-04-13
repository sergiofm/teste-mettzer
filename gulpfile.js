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

gulp.task('browser-sync', function() {
    browserSync.init(['public/js/custom.js', 'public/index.html'], {
        proxy: 'localhost:8000'
    });
});

// return é para tornar assincrona
gulp.task('clean', function () {
	return gulp.src('public/dist/')
	.pipe(clean());
});

// task para o sass/css
gulp.task('sass', function() {
	return es.merge([
		gulp.src(['public/sass/*.sass', 'node_modules/bootstrap/dist/css/bootstrap.min.css'])
		])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(concat('styles.min.css'))
    .pipe(gulp.dest('public/dist/css'));
});

gulp.task('watch', function(){
	gulp.watch('public/sass/**/*.sass', ['sass']);
});

gulp.task('jshint', function () {
	return gulp.src('public/js/**/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

gulp.task('uglify', function () {
	return es.merge([
		gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', 'public/js/custom.js'])
		.pipe(uglify())
	])
	.pipe(concat('all.min.js'))
	.pipe(gulp.dest('public/dist/js'))
	.pipe(reload({stream:true}));
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
	return runSequence('clean', ['uglify', 'sass', 'watch', 'browser-sync'], cb)
});
