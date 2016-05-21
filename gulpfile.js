var gulp = require('gulp');
var sass = require('gulp-sass');

var exec = require('child_process').exec;

gulp.task('runserver', function() {
    var proc = exec('python app.py');
});

gulp.task('default', ['runserver'] ,function() {
  // place code for your default task here
});

