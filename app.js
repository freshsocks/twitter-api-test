
/**
 * Module dependencies.
 */

var DEV_PORT = 3000;

var routes = require('./routes')
  , path = require('path')
  , util = require('util')
  , _ = require('underscore')
  , twitter = require('twitter')
  , twit = new twitter({
    	consumer_key: 'mYVqwQEonkbBww11sMg',
    	consumer_secret: 'BVRyXDr7PxPkwh74cM0K8DTQaxmiNCvNGdQ80mCE8',
    	access_token_key: '86416702-duXu6pIFjFzxq2yN2V71jsydxXo10hJhOlxCw1mIJ',
    	access_token_secret: 'w6VC6eBJUsmRn51mZk5n0hj1A4Dd6dS4FMVo1lKNA'
	});


/**
 * Create app, server, and socket.io
 */

var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);


// all environments
app.set('port', process.env.PORT || DEV_PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
	app.use(express.compress());
});

app.get('/', routes.index);

io.configure(function() {
	io.enable('browser client minification');
	io.enable('browser client etag');
	io.enable('browser client gzip');
	io.set('heartbeat interval', 60);
	io.set('heartbeat timeout', 120);
	io.set('log level',1);
	io.set('transports',[
		'websocket',
		'flashsocket',
		'htmlfile',
		'xhr-polling',
		'jsonp-polling'
	]);
});

io.sockets.on('connection', function (socket) {
	
	console.log('HANDSHAKE MADE!');

	socket.on('get-twitter-stream', function (username){
		var params = {
			screen_name : username,
			count : 20,
			trim_user : true,
			exclude_replies : true
		};
		console.log("Username: "+username);
		twit.get('/statuses/user_timeline.json', params, function (tweets) {
				console.log("twit.get > tweets\n"+util.inspect(tweets));
				socket.emit('twitter-data-update', tweets );
		});
	});
});


/**	///////////////////////////////////////////////////////////
 *  ///														///
 * 	///		Launch the server after everything is set up.	///
 *  ///														///
 */ ///////////////////////////////////////////////////////////

_.defer(function() {
	server.listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});
});