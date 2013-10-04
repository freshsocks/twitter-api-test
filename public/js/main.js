$( document ).ready(function() {

	var socket = io.connect('http://54.221.206.170');
	// socket.on('news', function (data) {
	// 	console.log(data);
	// 	socket.emit('my other event', { my: 'data' });
	// });
	socket.emit('get-twitter-stream');
	socket.on('twitter-data-update', function (data) {
		console.log(data);
		$.each(data['data'], function (i, tweet){
			$('#tweets').append('<p>'+tweet.text+'</p>');
		});
	});

});