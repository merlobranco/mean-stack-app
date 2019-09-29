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
			console.log('Found hotel', data);
			res
				.status(200)
				.json(data.reviews);
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
			console.log('Found hotel', hotel);
			// Mongoose allows us to extract the review identified by the provided reviewId
			var review = hotel.reviews.id(reviewId);
			res
				.status(200)
				.json(review);
			});
}

module.exports = {
	getAll,
	getReview
};