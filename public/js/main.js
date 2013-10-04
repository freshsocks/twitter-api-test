$( document ).ready(function() {

	var socket = io.connect('http://54.221.206.170');
	// socket.on('news', function (data) {
	// 	console.log(data);
	// 	socket.emit('my other event', { my: 'data' });
	// });
	$('#getTweetsButton').on('click', function(){
		var username = $('#username').html();
		socket.emit('get-twitter-stream', { username : username } );
	});
	
	socket.on('twitter-data-update', function (data) {
		console.log(data['data']);
			$('#tweets').html('');
		$.each(data['data'], function (i, tweet){
			$('#tweets').append('<p>'+tweet.text+'</p>');
		});
	});

});