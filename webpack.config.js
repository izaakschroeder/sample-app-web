
var path = require('path'),
	// glob = require('glob'),
	mapValues = require('lodash/object/mapValues'),
	// each = require('lodash/collection/each'),
	webpack = require('webpack'),
	StaticPagesWebpackPlugin = require('./lib/app'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');

var output = 'scripts/[name].[hash].js';

// Export the webpack configuration
var config = {
	entry: {

		// The vendor entry is for grouping external libraries that are not
		// likely to change, and thus can be packaged up separately from the
		// main application code. This is handy for caching since the client
		// won't have to re-download all the extra code.
		vendor: [
			'react',
			'react-router',
			'lodash'
		],

		test: [
			// 'west'
		],

		// The index entry is for the main app.
		index: [
			'webpack/hot/dev-server',
			'./lib/client.js'
		]
	},

	// Output controls the settings for file generation.
	output: {
		filename: output,
		publicPath: '/',
		path: path.join(__dirname, 'build'),
		chunkFilename: 'scripts/[id].[hash].js'
	},

	// Externals are for all the libraries you DON'T want webpack to have the
	// responsibility of loading. This can include many 3rd party libraries that
	// don't allow you to host your own copy of the code, such as Stripe.
	externals: {

	},

	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loaders: [
				// The React hot loader allows for live editing of pages with
				// React components, swapping in the correct code but keeping
				// the same props and state.
				'react-hot',
				// Babel is for ES6 + JSX features; since we use it so much
				// we'll keep the runtime separate to save on space.
				'babel-loader?optional=runtime'
			]
		}, {
			test: /\.(scss|sass)$/,
			loaders: [
				ExtractTextPlugin.loader({
					extract: true,
					omit: 1
				}),
				'style',
				'css',
				'autoprefixer?browsers=last 2 version',
				'sass?precision=10&outputStyle=expanded&sourceMap=true'
			]
		}, {
			// Pack any images we come across. When images are loaded via
			// require('image.jpg') the result is the path to the output image.
			test: /\.(jpe?g|png|gif|svg)$/i,
			loader: 'image?optimizationLevel=7&interlaced=false&name=images/[name].[hash].[ext]'
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

		// Export `process.env` to the app being built. Optimize your code by
		// checking `NODE_ENV` and set things like config variables (e.g.
		// `API_URL`).
		new webpack.DefinePlugin({
			'process.env': mapValues(process.env, JSON.stringify)
		}),

		// This performs the actual bundling of all the vendor files into their
		// own package. See the vendor entry above for more info.
		new webpack.optimize.CommonsChunkPlugin('vendor', output),

		// Add a comment banner at the beginning of the file to include an
		// appropriate copyright notice or other message.
		new webpack.BannerPlugin('Hello World.'),

		// HMR is the latest hotness that lets you reload parts of your page
		// for free. The webpack-dev-server comes with some HMR code for doing
		// this, but production code needs its own implementation.
		new webpack.HotModuleReplacementPlugin(),

		// Some crawlers or things with Javascript disabled prefer normal CSS
		// instead of Javascript injected CSS, so this plugin allows for the
		// collection of the generated CSS into its own file.
		new ExtractTextPlugin('styles/[name].[hash].css'),

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

		// This creates all the static HTML portions of the website; it is
		// equivalent to a form of "server-side rendering" except without the
		// need to be running `express` or similar; instead you can just run
		// the `webpack-dev-server`.
		/*new StaticPagesWebpackPlugin({

			webpack: {
				entry: { routes: './lib/routes.js' },
				module: {
					loaders: [{
						test: /\.js$/,
						exclude: /node_modules/,
						loaders: [
							'babel-loader?optional=runtime'
						]
					}]
				},
				plugins: [
					new webpack.IgnorePlugin(/\.(scss|sass)$/)
				],
				resolve: {
					root: [
						path.join(__dirname, 'components')
					]
				}
			},
			paths: [
				'/',
				'/about'
			]
		}),
		*/

		// When there are errors while compiling this plugin skips the emitting
		// phase (and recording phase), so there are no assets emitted that
		// include errors. The emitted flag in the stats is false for those
		// assets.
		new webpack.NoErrorsPlugin()

	],

	// Enable source-maps, which are pretty handy for debugging after the code
	// gets mangled from all the transformations that will be happening to it.
	devtool: 'source-map'
};


module.exports = config;
