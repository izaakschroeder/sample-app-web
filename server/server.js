
var http = require('http'),
	webpack = require('../../webpack.config'),
	app = require('./app')({
		webpack: webpack
	});

// Setup the server.
var server = http.createServer();
server.addListener('request', app);
server.listen(process.env['PORT'], function() {
	console.log('Listening...');
});

// Allow hot patching the server too! Cause restarting on code change sucks.
if (module.hot) {
	module.hot.accept();
	server.removeListener('request', app);
	webpack = require('../../webpack.config');
	app = require('./app')({
		webpack: webpack
	});
	server.addListener('request', app);
}
