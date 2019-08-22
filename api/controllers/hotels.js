'use strict'
// Since it is a json file we just could use require in order to read it
// With other type of files we should use the fs module
var hotelData = require('../data/hotel-data');

var getAll = function(req, res) {
	console.log('GET list of hotels');
	res
		.status(200)
		.json(hotelData);
};

var getHotel = function(req, res) {
	var id = req.params.id;
	var hotel = hotelData[id];
	console.log('GET hotel ', id);
	res
		.status(200)
		.json(hotel);
}

module.exports = {
	getAll,
	getHotel,
};