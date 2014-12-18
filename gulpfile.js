var gulp = require('gulp' ),
    plugins = require('gulp-load-plugins')();

gulp.task('sass', function () {
    gulp.src('./app/scss/main.scss')
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass-comb', function() {
    gulp.src('./app/scss/**/*.scss')
        .pipe(plugins.csscomb())
        .pipe(gulp.dest('./app/scss'));
});

// Concat and min js modules
gulp.task('build', function() {
    plugins.requirejs( require('./build.config') )
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch-sass', function() {
    gulp.watch( 'app/scss/**/*.scss', [ 'sass' ] ).on( 'change', function ( event ) {
        console.log( 'File ' + event.path + ' was ' + event.type + ', running tasks...' );
    } );
});

// @TODO: add watching for js and hbs

gulp.task('default', ['sass', 'build'] );