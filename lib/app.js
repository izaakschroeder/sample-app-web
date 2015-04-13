
var _ = require('lodash'),
	webpack = require('webpack'),
	loaderUtils = require('loader-utils'),
	React = require('react'),
	Router = require('react-router'),
	Dependency = require("webpack/lib/dependencies/SingleEntryDependency");



function StaticPagesWebpackPlugin(options) {
	_.assign(this, {

	}, options);

	this.webpack.library = 'pages';
	this.webpack.libraryTarget = 'commonjs2';

}

StaticPagesWebpackPlugin.prototype.apply = function(compiler) {
	var _this = this;
	compiler.plugin('emit', function onEmit(compilation, callback) {
		var assets = compilation.getStats().toJson();
		_this.render(compilation, assets, callback);
	});
};

StaticPagesWebpackPlugin.prototype.getRoutes = function(compiler, callback) {
	webpack(this.webpack, function() {

	});
};

StaticPagesWebpackPlugin.prototype.render = function(compiler, assets, done) {
	var render = this.dynamic ? React.renderToString : React.renderToStaticMarkup,
		props = { };

	var name = 'index.html', path = '/', _this = this;
	this.getRoutes(compiler, function gotRoutes(err, routes) {
		if (err) {
			return done(err);
		}
		Router.run(routes, path, function routed(root) {
			_this.emit(
				compiler,
				name,
				'<!DOCTYPE html>' + render(React.createElement(root, props))
			);
			done();
		});
	});
};

StaticPagesWebpackPlugin.prototype.emit = function emit(compiler, name, value) {
	compiler.assets[name] = {
		source: function getSource() {
			return value;
		},
		size: function getSize() {
			return value.length;
		}
	};
};

StaticPagesWebpackPlugin.prototype.params = function params(compiler, stats) {
	var root = compiler.options.output.publicPath || '';
	return _.chain(stats.chunks)
		// Order the chunks so commons chunks come first.
		.sort(function orderEntryLast(a, b) {
			if (a.entry !== b.entry) {
				return b.entry ? 1 : -1;
			} else {
				return b.id - a.id;
			}
		})
		// Get all the files.
		.pluck('files')
		// Squash.
		.flatten()
		// Use publicPath as the base.
		.map(function rebasePath(path) {
			return root + path;
		})
		// Organize by type.
		.groupBy(function group(path) {
			if (/\.js$/.test(path)) {
				return 'scripts';
			} else if (/\.css$/.test(path)) {
				return 'styles';
			} else {
				return 'other';
			}
		})
		// Output.
		.value();
};

module.exports = StaticPagesWebpackPlugin;
