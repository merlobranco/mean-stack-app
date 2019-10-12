'use strict'
// Since it is a json file we just could use require in order to read it
// With other type of files we should use the fs module

var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res) {
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);

	Hotel
		.aggregate([
			{
		    	$geoNear: {
		        	near: { type: "Point", coordinates: [lng, lat] },
		        	distanceField: "dist.calculated",
		        	maxDistance: 2000, // Expressed in meters
		        	// query: { 'currency': 'HUF' }, // Applying filters
		        	// includeLocs: "dist.location",
		        	spherical: true
		    	}
		   },
	   		{ $limit: 5 } // Number of returned records
	   	], (err, results) => {
	   		console.log('Geo results: ', results);
	   		res
				.status(200)
				.json(results);
	   	});
}


var getAll = function(req, res) {

	var offset = 0;
	var count = 5;
	var maxCount = 10;

	if (req.query && req.query.lat && req.query.lng) {
		runGeoQuery(req, res);
		return;
	}

	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10);
	}

	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}

	if (isNaN(offset) || isNaN(count)) {
		res
			.status(400)
			.json({'message': 'If supplied in querystring count and offset should be numbers'});
		return;
	}

	if (count > maxCount) {
		res
			.status(400)
			.json({'message': 'Count limit of ' + maxCount + ' exceeded'});
		return;
	}

	Hotel
		.find()
		.skip(offset)
		.limit(count)
		.exec((err, hotels) => {
			if (err) {
				console.log('Error finding hotels');
				res
					.status(500)
					.json(err);
			} 
			else {
				console.log('Found hotels: ', hotels.length);
				res.json(hotels); // By default the status is 200
			}	
	});
};

var getHotel = function(req, res) {
	var id = req.params.id;
	console.log('Get hotel id: ', id);

	Hotel
		.findById(id)
		.exec((err, data) => {
			var response = {
				status: 200,
				message: data
			};
			if (err) {
				console.log('Error finding the hotel');
				response.status = 500;
				response.message = err;
			} 
			else if (!data) {
				response.status = 404;
				response.message = {'message': 'Hotel with ID: ' + id + 'not found'};
			}
			res
				.status(response.status)
				.json(response.message);
			});
				
}

var addHotel = function(req, res) {
	console.log("POST new hotel");

	if (!req.body || !req.body.name || !req.body.stars) {
		console.log('Data missing from body');
		res
			.status(400)
			.json({message: 'Required data missing from body'});
	}

	var hotel = req.body;
	hotel.stars = parseInt(hotel.stars, 10);
	
	var db = dbConn.get();
	db.collection('hotels')
		.insertOne(hotel, (err, data) => {
			console.log(hotel);
			res
				.status(201)
				.json(data.ops);
		});
}

module.exports = {
	getAll,
	getHotel,
	addHotel
};