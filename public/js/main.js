$( document ).ready(function() {

	var socket = io.connect('http://54.221.206.170');
	// socket.on('news', function (data) {
	// 	console.log(data);
	// 	socket.emit('my other event', { my: 'data' });
	// });
	socket.on('twitter-data-update', function (data) {
		console.log(data);
	});

});