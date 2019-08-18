

'use strict'

var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), () => {
	var port = server.address().port;
	console.log('Magic happens on port ' + port);
});
