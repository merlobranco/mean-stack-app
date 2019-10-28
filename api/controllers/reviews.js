'use strict'

var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var getAll = function(req, res) {
	var id = req.params.id;
	console.log('Get reviews hotel id: ', id);

	Hotel
		.findById(id)
		// In order to reduce the retrieved data from the database
		// We could indicate the path/part of the element that we only want
		// The document will be retrieved containing only that element
		.select('reviews')
		.exec((err, data) => {
			var response = {
        		status : 200,
        		message : []
      		};
      		if (err) {
		    	console.log('Error finding hotel');
		        response.status = 500;
		        response.message = err;
		    } else if(!data) {
		        console.log('Hotel id not found in database', id);
		        response.status = 404;
		        response.message = {'message' : 'Hotel ID not found ' + id};
		    } else {
		    	console.log('Found hotel', data);
		        response.message = data.reviews ? data.reviews : [];
		    }
			res
				.status(response.status)
				.json(response.message);
		});
}

var getReview = function(req, res) {
	var id = req.params.id;
	var reviewId = req.params.reviewId;
	console.log('Get review id: ' + reviewId + ', for hotel id: ' + id);

	Hotel
		.findById(id)
		.select('reviews')
		.exec((err, hotel) => {
			var response = {
        		status : 200,
        		message : {}
      		};
      		if (err) {
		    	console.log('Error finding hotel');
		        response.status = 500;
		        response.message = err;
		    } else if(!hotel) {
		        console.log('Hotel id not found in database', id);
		        response.status = 404;
		        response.message = {'message' : 'Hotel ID not found ' + id};
		    } else {
		    	console.log('Found hotel', hotel);
		    	// Mongoose allows us to extract the review identified by the provided reviewId
		        response.message = hotel.reviews.id(reviewId);
		        if (!response.message) {
		        	response.status = 404;
		        	response.message = {'message' : 'Review ID not found ' + reviewId};
		        }

		    }
			res
				.status(response.status)
				.json(response.message);
		});
}

module.exports = {
	getAll,
	getReview
};