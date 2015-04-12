
/*
var AWS = require('aws-sdk'),
	gulp = require('gulp');

// Invalidate the CloudFront cache
gulp.task('invalidate', function invalidate(done) {
	var cloudfront = new AWS.CloudFront();
	var items = [ '/index.html' ];
	var params = {
		DistributionId: process.env['DEPLOY_DISTRIBUTION'],
		InvalidationBatch: {
			CallerReference: Math.random().toString(38).substr(1),
			Paths: {
				Quantity: items.length,
				Items: items
			}
		}
	};
	cloudfront.createInvalidation(params, done);
});
*/

var gulp = require('gulp');

gulp.task('foo', function(done) {
	done();
});
