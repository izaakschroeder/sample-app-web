
var webpack = require('webpack'),
	socketio = require('socket.io'),
	http = require('http'),
	createApp = require('./lib/app');

var compiler = webpack({}),
	io = socketio(),
	app = createApp({
		events: io,
		compiler: compiler
	}),
	server = http.createServer(app);

io.attach(server);
server.listen(process.env['PORT'] || 8090);
