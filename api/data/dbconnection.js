'use strict'

var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/mean-hotel';

var _connection = null;

// creting a database connection and making it reusable through the get method
var open = function() {
	MongoClient.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
		if (err) {
			console.log('DB connection failed');
			return;
		}
		_connection = db;
		console.log('DB connection open', db);
	});

};

var get = function() {
	return _connection;
}

module.exports = {
	open,
	get
};