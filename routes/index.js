var util = require('util');
var twitter = require('twitter');
var twit = new twitter({
    consumer_key: 'mYVqwQEonkbBww11sMg',
    consumer_secret: 'BVRyXDr7PxPkwh74cM0K8DTQaxmiNCvNGdQ80mCE8',
    access_token_key: '86416702-duXu6pIFjFzxq2yN2V71jsydxXo10hJhOlxCw1mIJ',
    access_token_secret: 'w6VC6eBJUsmRn51mZk5n0hj1A4Dd6dS4FMVo1lKNA'
});
/*
 * GET home page.
 */

exports.index = function(req, res){
	twit.stream('statuses/filter', { track : 'nodejs' }, function(stream) {
		console.log('statuses/filter: waiting...');
		stream.on('data', function(data) {
			console.log(util.inspect(data));
			res.render('index', { title: 'Twitter API test!'});
		});
		//Disconnect stream after five seconds
		setTimeout(function(){
			stream.destroy;
			console.log('Timed Out');
			res.render('index', { title: 'Twitter API test! ERROR!'});
		}, 5000);
	});
};