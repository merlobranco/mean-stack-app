'use strict'
// Since it is a json file we just could use require in order to read it
// With other type of files we should use the fs module

var dbConn = require('../data/dbconnection');
var hotelData = require('../data/hotel-data');
var ObjectId = require('mongodb').ObjectId;

var getAll = function(req, res) {

	// Retrieving the query string parameters
	console.log(req.query);

	var offset = 0;
	var count = 5;

	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10);
	}

	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}

	var db = dbConn.get();
	db.collection('hotels')
		.find()
		.skip(offset)
		.limit(count)
		.toArray((err, data) => {
			console.log('Found hotels', data);
			res
				.status(200)
				.json(data);
			});
};

var getHotel = function(req, res) {
	var id = req.params.id;

	var db = dbConn.get();
	db.collection('hotels')
		.findOne({_id: ObjectId(id)}, (err, data) => {
			console.log('Found hotel', data);
			res
				.status(200)
				.json(data);
			});
}

var addHotel = function(req, res) {
	console.log("POST new hotel");
	console.log(req.body)
	res
		.status(200)
		.json(req.body);
}

module.exports = {
	getAll,
	getHotel,
	addHotel
};