
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';
import renderer from './renderer';

import Application from '../lib/app';
import Layout from '../lib/layout';


function collect(root, stats) {
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
		.map(function rebase(file) {
			return path.join(root, file);
		})
		// Organize by type.
		.groupBy(function group(file) {
			if (/\.js$/.test(file)) {
				return 'scripts';
			} else if (/\.css$/.test(file)) {
				return 'styles';
			} else {
				return 'other';
			}
		})
		// Output.
		.value();
}

function header(headers) {
	return (req, res, next) => {
		res.set(headers);
		next();
	};
}

export default function(options) {
	let app = express();

	const render = renderer({
		app: Application,
		layout: Layout
	});

	let stats =  { };

	options = _.assign({

	}, options);

	// https://blog.matatall.com/2014/08/this-blog-uses-csp-level-2-script-hash-support/

	app.use(header({
		// Some sane defaults
		'X-UA-Compatible': 'IE=edge,chrome=1',
		'Strict-Transport-Security': 'max-age=15768000; includeSubDomains',
		'Content-Security-Policy': 'script-src \'self\'',
		'X-Frame-Options': 'DENY',
		'X-Content-Type-Options': 'nosniff'
	}));

	const publicPath = options.webpack.output.publicPath;

	// Serve static assets straight from webpack
	if (options.live) {
		const compiler = webpack(options.webpack);
		app.use(middleware(compiler, {

		}));
	} else {
		const outputPath = options.webpack.output.path;
		const statsFile = path.join(outputPath, 'stats.json');

		stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));

		// Serve static assets
		app.use(publicPath, express.static(outputPath, {
			index: false,
			maxAge: '100 years'
		}));
	}

	app.get('/', function handlePage(req, res, next) {

		var props = { }, layout = { };

		// Import webpack assets
		_.assign(layout, collect(publicPath, stats));

		_.assign(layout, {
			description: 'Test',
			keywords: 'test test',
			title: 'Test'
		});

		console.log(layout);

		render(props, layout).then(function rendered(html) {
			res.status(200)
				.set('Content-Type', 'text/html;encoding=utf-8')
				.send('<!DOCTYPE html>' + html);
		}, next);
	});

	// Error handler.
	app.use(function errorHandler(err, req, res, next) {
		// Do nothing useful for now.
		next(err);
	});



	return app;
}
