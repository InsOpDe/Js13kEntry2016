/**
 * Created by Marcel Michelfelder on 14.08.2016.
 */

var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
        watch = require('gulp-watch'),
        zip = require('gulp-zip'),
    //tingpng = require('gulp-tinypng'),
    tiny = require('gulp-tinypng-nokey'),
    gp_sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function () {

    //watch('./res/*.*',{
    //    verbose : true,
    //    ignoreInitial : false
    //}, function(){
    //    gulp.src('.res/*.*')
    //        .pipe(tiny())
    //        //.pipe(tingpng('WllejupoIJwQYRq5kKwJMDbKNgGwcY3V'))
    //        .pipe(gulp.dest('res'));
    //});

    watch('./src/**/*.js',{
        verbose : true,
        ignoreInitial : false
    }, function(){
        gulp.src('./src/**/*.js')
            .pipe(gp_sourcemaps.init())
            //.pipe(gp_concat('concat.js'))
            //.pipe(gulp.dest('build'))
            .pipe(gp_concat('uglify.js'))
            .pipe(gp_uglify())
            .pipe(gp_sourcemaps.write('./'))
            .pipe(gulp.dest('build'));

        gulp.src(['./build/uglify.js', './res/*.*', './src/index.html'])
            .pipe(zip('archive.zip'))
            .pipe(gulp.dest('build'));
    })

});
