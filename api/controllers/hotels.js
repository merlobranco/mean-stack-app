'use strict'
// Since it is a json file we just could use require in order to read it
// With other type of files we should use the fs module
var hotelData = require('../data/hotel-data');

var getAll = function(req, res) {
	console.log('GET list of hotels');
	// Retrieving the query string parameters
	console.log(req.query);

	var offset = req.query.offset || 0;
	var count = req.query.count || hotelData.length;
	var end = offset + count;
	if (end > hotelData.length)
		end = hotelData.length;
	var result = hotelData.slice(offset, end);
	res
		.status(200)
		.json(result);
};

var getHotel = function(req, res) {
	var id = req.params.id;
	var hotel = hotelData[id];
	console.log('GET hotel ', id);
	res
		.status(200)
		.json(hotel);
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