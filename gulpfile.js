var gulp = require('gulp' ),
    plugins = require('gulp-load-plugins')();

gulp.task('sass', function () {
    gulp.src('./app/scss/*.scss')
        .pipe(plugins.sass())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('default', ['sass']);