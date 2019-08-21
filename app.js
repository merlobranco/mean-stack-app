

'use strict'

var express = require('express');
var app = express();
var path = require('path');

app.set('port', process.env.PORT || 3000);

// Sending Home Page
app.get('/', function(req, res) {
	console.log('GET the homepage');
	res
		.status(200)
		.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Sending a json object
app.get('/json', function(req, res) {
	console.log('GET the json');
	res
		.status(200)
		.json({'jsonData': true});
});

// Sending a file
app.get('/file', function(req, res) {
	console.log('GET the file');
	res
		.status(200)
		.sendFile(path.join(__dirname, 'app.js'));
});

var server = app.listen(app.get('port'), () => {
	var port = server.address().port;
	console.log('Magic happens on port ' + port);
});
