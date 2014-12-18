var gulp = require('gulp' ),
    plugins = require('gulp-load-plugins')();

gulp.task('sass', function () {
    gulp.src('./app/scss/main.scss')
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('build', function() {
    plugins.requirejs( require('./build.config') )
        .pipe(gulp.dest('./dist/'));
});

gulp.watch('app/scss/**/*.scss', ['sass'] ).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

//gulp.watch('app/js/**/*.js', ['build'] ).on('change', function(event) {
//    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//});

gulp.task('default', ['sass', 'build']);