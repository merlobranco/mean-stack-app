'use strict'
// Since it is a json file we just could use require in order to read it
// With other type of files we should use the fs module

var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res) {
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);

	if (isNaN(lng) || isNaN(lat)) {
		res
			.status(400)
			.json({'message': 'If provided, lng and lat coordinates should be numbers'});
		return;
	}

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
	   		if (err) {
				console.log('Error finding Hotels 2km around the provided coordinates (Lng: ' + lng + ', Lat: ' + lat + ')');
				res
					.status(500)
					.json(err);
			} 
			else {
				console.log('Geo results: ', results.length);
				res.json(results); // By default the status is 200
			}
	   	});
};


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
};

var addHotel = function(req, res) {
	Hotel
		.create({
			name: req.body.name,
			description: req.body.description,
			stars: parseInt(req.body.stars, 10),
			services: _splitArray(req.body.services),
			photos: _splitArray(req.body.photos),
			currency: req.body.currency,
			location: {
				address: req.body.address,
				coordinates: [
					parseFloat(req.body.lng), 
					parseFloat(req.body.lat)
				]
			}

		}, (err, hotel) => {
			
			if (err) {
				console.log('Error creating hotel');
				res
					.status(500)
					.json(err);
			}
			else {
				console.log('Hotel created ', hotel);
				res
					.status(201)
					.json(hotel);

			}
		});
};

var _splitArray = function(input) {
	if (input && input.length > 0) 
		return input.split(';');
	return [];
};

module.exports = {
	getAll,
	getHotel,
	addHotel
};