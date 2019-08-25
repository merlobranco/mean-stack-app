'use strict'

var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017';

var _connection = null;

// creting a database connection and making it reusable through the get method
var open = function() {
	MongoClient.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
		if (err) {
			console.log('DB connection failed');
			return;
		}
		_connection = client.db('mean-hotel');
		console.log('DB connection open', _connection);
	});

};

var get = function() {
	return _connection;
}

module.exports = {
	open,
	get
};