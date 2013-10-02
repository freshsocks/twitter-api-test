
/**
 * Module dependencies.
 */

var DEV_PORT = 3000;

var routes = require('./routes');
var user = require('./routes/user');
var path = require('path');
var util = require('util');
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
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

server.listen(DEV_PORT);

app.get('/', routes.index);
app.get('/users', user.list);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

// Twitter routing
// twit.get('/statuses/show/27593302936.json', {include_entities:true}, function(data) {
//     console.log(util.inspect(data));
// });



// http.createServer(app).listen(app.get('port'), function(){
// 	console.log('Express server listening on port ' + app.get('port'));
// });
