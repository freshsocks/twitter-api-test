
/**
 * Module dependencies.
 */

var DEV_PORT = 3000;

var routes = require('./routes');
var user = require('./routes/user');
var path = require('path');
var util = require('util');
var twitter = require('twitter');
var twit = new twitter({
    consumer_key: 'mYVqwQEonkbBww11sMg',
    consumer_secret: 'BVRyXDr7PxPkwh74cM0K8DTQaxmiNCvNGdQ80mCE8',
    access_token_key: '86416702-duXu6pIFjFzxq2yN2V71jsydxXo10hJhOlxCw1mIJ',
    access_token_secret: 'w6VC6eBJUsmRn51mZk5n0hj1A4Dd6dS4FMVo1lKNA'
});

//var _ = require('underscore');

// Init server, express app, and socket. Everyone is listening.
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
app.use(require('stylus').middleware(__dirname + '/public/css'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', routes.index);
app.get('/users', user.list);

io.sockets.on('connection', function (socket) {
	console.log('HANDSHAKE MADE!');

	socket.on('get-twitter-stream', function(username){
		var params = {
			screen_name : username,
			count : 50,
			trim_user : true,
			exclude_replies : true
		};
		twit.get('/statuses/user_timeline.json', params, function (data) {
				console.dir(util.inspect(data[data]));
				socket.emit('twitter-data-update', { data : data });
		});
	});
	
	//socket.emit('news', { hello: 'world' });
	// socket.on('my other event', function (data) {
	// 	console.log(data);
	// });
});

// Twitter routing
// twit.get('/statuses/show/27593302936.json', {include_entities:true}, function(data) {
//     console.log(util.inspect(data));
// });



// http.createServer(app).listen(app.get('port'), function(){
// 	console.log('Express server listening on port ' + app.get('port'));
// });
