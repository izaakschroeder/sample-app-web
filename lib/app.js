
var _ = require('lodash'),
	React = require('react');



function StaticPagesWebpackPlugin(options) {
	_.assign(this, {

	}, options);
}

StaticPagesWebpackPlugin.prototype.apply = function(compiler) {
	var _this = this;
	compiler.plugin('emit', function onEmit(compilation, callback) {
		var assets = compilation.getStats().toJson();
		_this.render(compilation, assets);
		callback();
	});
};

StaticPagesWebpackPlugin.prototype.render = function(compiler, assets) {
	var render = this.dynamic ? React.renderToString : React.renderToStaticMarkup,
		props = { };

	var name = 'index.html', root = 'html';

	Router.run(routes, '/', function (Handler) {
		this.emit(compiler, name, render(React.createElement(root, props)));
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
