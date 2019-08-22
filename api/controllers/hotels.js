'use strict'
// Since it is a json file we just could use require in order to read it
// With other type of files we should use the fs module
var hotelData = require('../data/hotel-data');

module.exports.getAll = function(req, res) {
	console.log('GET list of hotels');
	res
		.status(200)
		.json(hotelData);
};