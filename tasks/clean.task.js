
var gulp = require('gulp'),
	rimraf = require('rimraf');

// Delete everything in the build folder.
gulp.task('clean', function clean(done) {
	rimraf('build', done);
});
