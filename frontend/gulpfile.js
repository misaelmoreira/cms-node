const gulp = require('gulp');
const { watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var gp_concat = require('gulp-concat');
var gp_rename = require('gulp-rename');
var gp_uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var gp_sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var nodemon = require('nodemon');

function jsBuild(){
    return gulp.src(['public/javascripts/*.js'])
    .pipe(gp_concat('concat.js'))
    //.pipe(gulp.dest('dist'))
    .pipe(gp_rename('aplication.min.js'))
    .pipe(gp_uglify())
    .pipe(gulp.dest('public/javascripts/build/'));
};

function cssBuild(){
    return gulp.src(['public/stylesheets/sass/aplication.scss'])
    .pipe(sass().on('error',sass.logError))
    .pipe(gp_sourcemaps.init())
    .pipe(gp_concat('concat.css'))
    //.pipe(gulp.dest('dist'))
    .pipe(gp_rename('aplication.min.css'))
    //.pipe(cssmin())
    .pipe(gp_sourcemaps.write('./'))
    .pipe(gulp.dest('public/stylesheets/sassbuild/'));
};

function reload(){
    return gulp.src(['app/**/**'])
    .pipe(livereload());
}

gulp.task('server', function(){
    nodemon({
        script: 'bin/www',
        watch: [
            "bin/www",
            "app.js",
            "app/**/**"
        ],
        ext: 'js'
    }).on('restart', () => {
        console.log("::: Server Reload :::");
    });
});


gulp.task('default', function(){
    livereload.listen();
    watch('public/stylesheets/sass/**/*.scss', cssBuild );
    //watch('public/stylesheets/*.css', cssBuild );
    watch('public/javascripts/*.js', jsBuild );
    watch('app/**/**', reload);
});

