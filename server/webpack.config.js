
var path = require('path'),
	webpack = require('webpack');

// Export the webpack configuration
var config = {
	name: 'server',
	target: 'node',
	entry: {
		// The server entry is for the main app.
		server: [
			'webpack/hot/signal',
			'./server.js'
		]
	},

	// Output controls the settings for file generation.
	output: {
		filename: 'server.js',
		path: path.join(__dirname, 'build'),
		libraryTarget: 'commonjs2'
	},

	externals: [
		// Avoid bundling certain node modules
		function checkNodeModule(context, request, cb) {
			if (/^[a-z\-0-9]+$/.test(request)) {
				cb(null, 'commonjs ' + request);
				return;
			}
			cb();
		},
		'../../webpack.config'
	],

	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loaders: [
				// Babel is for ES6 + JSX features; since we use it so much
				// we'll keep the runtime separate to save on space.
				'babel-loader?optional=runtime'
			]
		}, {
			test: /\.(scss|sass)$/,
			loaders: [
				// On the server any kind of stylesheet is worthless, so just
				// resolve it to nothingness.
				'null-loader'
			]
		}, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			loader: [
				// Since images resolve to URLs, we have to hijack the client
				// generated pack and use the URLs found within that.
				'null-loader'
			]
		}, {
			test: /\.json5?$/i,
			loader: 'json5-loader'
		}]
	},

	resolve: {
		// The root option controls where module resolution occurs; i.e. if you
		// have require('foo') which paths are searched for 'foo'. Having the
		// 'components' folder here allows for swapping out components into
		// their own "real" modules later on with less work.
		root: [
			path.join(__dirname, 'components')
		]
	},

	plugins: [

		// Add a comment banner at the beginning of the file to include an
		// appropriate copyright notice or other message.
		new webpack.BannerPlugin('Hello World.'),

		// Inject source map support so we get nice debugging messages.
		new webpack.BannerPlugin('require("source-map-support").install();', {
			raw: true
		}),

		// HMR is the latest hotness that lets you reload parts of your page
		// for free. The webpack-dev-server comes with some HMR code for doing
		// this, but production code needs its own implementation.
		new webpack.HotModuleReplacementPlugin(),

		// Output the build pogress to the command line.
		new webpack.ProgressPlugin(function progress(percentage, message) {
			var MOVE_LEFT = new Buffer('1b5b3130303044', 'hex').toString();
			var CLEAR_LINE = new Buffer('1b5b304b', 'hex').toString();
			process.stdout.write(
				CLEAR_LINE +
				Math.round(percentage * 100) +
				'%:' +
				message +
				MOVE_LEFT
			);
		}),

		// The server is a long running process that doesn't get partial updates
		// when running in production, so squash the chunks.
		new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })

	],

	// Enable source-maps, which are pretty handy for debugging after the code
	// gets mangled from all the transformations that will be happening to it.
	devtool: 'source-map'
};

module.exports = config;
