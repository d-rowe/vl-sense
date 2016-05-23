var gulp = require('gulp');
var sass = require('gulp-sass');

var exec = require('child_process').exec;

gulp.task('runserver', function() {
    var proc = exec('python app.py');
});

// keeps gulp from crashing for scss errors
gulp.task('sass', function () {
  return gulp.src('./static/sass/*.scss')
      .pipe(sass({ errLogToConsole: true }))
      .pipe(gulp.dest('./static/css'));
});

gulp.task('watch', function () {
  gulp.watch('./static/sass/*.scss', ['sass']);
});

gulp.task('default', ['runserver', 'watch', 'sass'] ,function() {
  // place code for your default task here
});

