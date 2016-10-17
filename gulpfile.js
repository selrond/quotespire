"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task("workflow", function(){
	gulp.src("./src/sass/**/*.scss")
	.pipe(sass().on('error', sass.logError))
	.pipe(cssnano())
	.pipe(gulp.dest("./dist/css/"))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task("serve", function () {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	gulp.watch("./src/sass/**/*.scss", ["workflow"]);
	gulp.watch("./**/*.html").on("change", browserSync.reload);
});

gulp.task("default", ["workflow", "serve"]);
