/**
 * Created by Marcel Michelfelder on 14.08.2016.
 */

var gulp = require('gulp'),
    fs = require('fs'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    //gp_uglify = require('gulp-uglifyjs'),
    gp_uglify = require('gulp-uglify'),
    gp_replace = require('gulp-replace'),
    gp_wrap = require("gulp-wrap"),
    gp_babel = require('gulp-babel'),
    gp_inject = require('gulp-inject'),
    gp_callback = require('gulp-callback'),
    gp_htmlmin = require('gulp-htmlmin'),
    gp_closure =  require('gulp-closure-compiler-service'),
    gp_yuicompress = require('gulp-yuicompressor'),
    gp_closureCompiler =  require('gulp-closure-compiler'),
        watch = require('gulp-watch'),
        zip = require('gulp-zip'),
    //tingpng = require('gulp-tinypng'),
    tiny = require('gulp-tinypng-nokey'),
    chalk = require('chalk'),
    gp_sourcemaps = require('gulp-sourcemaps');
var lebab = require('lebab');

var error = chalk.bold.red;
var success = chalk.green;
var regular = chalk.white;

gulp.task('default', function () {

    zipIt()


    watch(['./src/**/*.js', "!./src/img.js", './res/*.png'],{
        verbose : true,
        ignoreInitial : false
    }, function(){


        var res = ['area','crate','drone','items','player'];
        var resJson = {}

        function loadImage(res, cb){
            if(res.length){
                var name = res.pop();

                fs.readFile('./res/' + name + '.png', function(err, original_data){
                    //fs.writeFile('image_orig.jpg', original_data, function(err) {});
                    if(err) console.log('./res/' + name + '.png', err);
                    var base64Image = original_data.toString('base64');
                    resJson[name] = base64Image;
                    loadImage(res, cb)
                });

            } else {
                cb();
            }
        }

        loadImage(res, function(){

            fs.writeFile("./src/img.js", "var img = " + JSON.stringify(resJson), function(err) {
                if(err) {
                    return console.log(err);
                }

                //console.log("The file was saved!");

                gulp.src(['./src/**/*.js', "!./src/debug.js"])
                    .pipe(gp_sourcemaps.init())
                    .pipe(gp_concat('../build/uglify.js'))


                    .pipe(gp_wrap('(function(){\n<%= contents %>\n})()'))


                    //.pipe(gp_replace(/.*/, function(s) {
                    //    return '(function(){' + s + '})()';
                    //}))
                    //.pipe(gp_closure({
                    //    language: 'ECMASCRIPT5',
                    //    compilation_level: 'ADVANCED_OPTIMIZATIONS'
                    //}))
                    //.pipe(gp_closureCompiler({
                    //    compilerPath: 'C:/Users/Marcel-Privat/bower_components/closure-compiler/compiler.jar',
                    //    fileName: 'uglify.js',
                    //    compilerFlags: {
                    //        closure_entry_point: 'index.js',
                    //        compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    //        only_closure_dependencies: true,
                    //        warning_level: 'VERBOSE'
                    //    }
                    //}))

                    .pipe(gp_uglify())

                    //.pipe(gp_yuicompress({
                    //    type: 'js'
                    //}))
                    .pipe(gp_sourcemaps.write('./'))
                    .pipe(gulp.dest('build'))



            });



        });


    })

});

function zipIt(){
    watch(['./build/uglify.js'/*, './res/*.*'*/, './src/index.html'],{
        verbose : true,
        ignoreInitial : false
    }, function() {
        gulp.src(['./build/uglify.js'/*, './res/*.*'*/, './src/index.html'])
            //    gulp.src([/*'./build/uglify.js', './res/*.*'*/, './src/index.html'])
            //    .pipe(gp_replace('<script src="../build/uglify.js"></script>', function(s) {
            //        var script = fs.readFileSync('./build/uglify.js', 'utf8');
            //        script = lebab.transform(script, ['arrow']).code;
            //        return '<script>\n' + script + '\n</script>';
            //    }))
            //    .pipe(gp_htmlmin({collapseWhitespace: true}))
            //    .pipe(gulp.dest('build'))
            //    .pipe(gp_rename('i.html'))
            .pipe(zip('g.zip'))
            .pipe(gulp.dest('build'));

        var stats = fs.statSync("./build/g.zip");
        var fileSize = stats.size;
        if (fileSize > 13312) {
            //console.log(error("Your zip compressed game is larger than 13kb (13312 bytes)!"))
            console.log(regular("Your zip compressed game is " + fileSize + "/13312 bytes"));
        } else {
            console.log(success("Your zip compressed game is " + fileSize + "/13312 bytes."));
        }
    });
}
