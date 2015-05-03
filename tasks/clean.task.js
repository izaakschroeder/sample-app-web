
import gulp from 'gulp';
import rimraf from 'rimraf';

// Delete everything in the build folder.
gulp.task('clean', done => rimraf('build', done));
