'use strict'

var express = require('express');
var app = express();
var path = require('path');

app.set('port', process.env.PORT || 3000);

// Calling a custom middleware for all the requests
// that will display all the called routes in the static route
// It's working because is before the access to the static content
// It will work only for the lines of code that are bellow
// The order of the middleware is important it will run sequentially
// one after the other
app.use((req, res, next) => {
	console.log(req.method, req.url);
	next();
});

// Accesing to the static content of the public folder
// In this case we are accessing to the home page
app.use(express.static(path.join(__dirname, 'public')));

// Sending a json object
app.get('/json', (req, res) => {
	console.log('GET the json');
	res
		.status(200)
		.json({'jsonData': true});
});

// Sending a file
app.get('/file', (req, res) => {
	console.log('GET the file');
	res
		.status(200)
		.sendFile(path.join(__dirname, 'app.js'));
});

var server = app.listen(app.get('port'), () => {
	var port = server.address().port;
	console.log('Magic happens on port ' + port);
});
