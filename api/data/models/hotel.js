'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var HotelSchema = new mongoose.Schema({
	name: { 
		type: String,
		required: true // Setting this property as required
	},
	stars: {
		type: Number,
		min: 0,
		max: 5,
		default: 0
	},
	services: [String],
	description: String,
	photos: [String],
	currency: String
});

// Creating the Model (compilation of the Schema)
//module.exports = mongoose.model('Hotel', HotelSchema);
mongoose.model('Hotel', HotelSchema);