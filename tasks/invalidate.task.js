
var _ = require('lodash'),
	AWS = require('aws-sdk'),
	gulp = require('gulp'),
	through2 = require('through2');

/**
 * @param {Object} options Configuration options.
 * @returns {Object} Stream.
 */
function invalidator(options) {
	var items = [ ];
	var cloudfront = new AWS.CloudFront();
	return through2.obj(function onFile(file, enc, done) {
		items.push(file.path.substr(file.base.length));
		done(null, file);
	}, function onEnd(done) {
		var params = _.assign({
			InvalidationBatch: {
				CallerReference: Math.random().toString(38).substr(1),
				Paths: {
					Quantity: items.length,
					Items: items
				}
			}
		}, options);
		cloudfront.createInvalidation(params, done);
	});
}

// Invalidate the CloudFront cache. Since the only files that are served in a
// non-versioned manner are HTML files, those are the only ones that we look
// to invalidate.
gulp.task('invalidate', function invalidate() {
	return gulp.src('build/**/*.html')
		.pipe(invalidator({
			DistributionId: process.env['DEPLOY_DISTRIBUTION']
		}));
});
