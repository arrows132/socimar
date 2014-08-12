var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//var imagemin = require('gulp-imagemin');
var swig = require('gulp-swig');
var sass = require('gulp-sass');
var connect = require('gulp-connect');


var paths = {   
    scripts: ['./dev/js/**/*.js'], 
    images: './dev/img/**/*',    
    scss: './dev/css/*.scss',
};

var filesToMove = [
    './dev/favicon.png',
    './dev/img/**',
    './dev/css/*.css'
];

gulp.task('connect', function() {
    connect.server({
        root: './build',
        livereload: true,
        port: 8899,
    });
});

gulp.task('move', function(){
    gulp.src(filesToMove, { base: './dev' })
    .pipe(gulp.dest('./build/'));
});

gulp.task('scripts', function() {
    gulp.src(paths.scripts)
        //.pipe(uglify())
        //.pipe(concat('all.min.js'))
        .pipe(gulp.dest('./build/js'))
        .pipe(connect.reload());
});

gulp.task('sass', function () {
    gulp.src('./dev/css/*.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest('./build/css'))
        .pipe(connect.reload());
});

//I'm not sure there is even a need for partials but no real downside to just including now. 
gulp.task('templates', function() {
    gulp.src('./dev/partials/**/*.html')
        .pipe(swig({
            defaults: {
                cache: false,
            }
        }))
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

//gulp.task('images', function() {
//    gulp.src(paths.images)
//        .pipe(imagemin({optimizationLevel: 5}))
//       .pipe(gulp.dest('./build/img'));
//});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch('./dev/partials/**/*.html', ['templates']);
//  gulp.watch(paths.images, ['images']);
    gulp.watch(paths.scss, ['sass']);   
});

gulp.task('default', ['connect', 'watch', 'sass', 'scripts', 'templates', 'move']);