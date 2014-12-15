var gulp = require('gulp' ),
    plugins = require('gulp-load-plugins')();

gulp.task('sass', function () {
    gulp.src('./app/scss/main.scss')
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest('./dist/css'));
});

//var watcher = gulp.watch('app/**/*.js', ['uglify','reload']);
//watcher.on('change', function(event) {
//    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//});

var watcher = gulp.watch('app/scss/**/*.scss', ['sass']);
watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

gulp.task('default', ['sass']);