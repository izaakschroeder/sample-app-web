
import gulp from 'gulp';
import webpack from 'webpack';

// Use webpack to build everything. This is more or less equivalent to invoking
// `webpack -p` on the command line.
gulp.task('build', callback => {

	// Load the main webpack configuration.
	let config = Object.create(require('../webpack.config'));

	// For production build we want to make everything nice and small, so add
	// some code for minimization. Note that it is important to set the
	// `NODE_ENV="production"` environment variable, since it results in a
	// significant amount of dead code elimination for certain libraries.
	config.plugins = config.plugins.concat(
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ minimize: true })
	);

	// Fire off webpack.
	webpack(config, callback);
});
