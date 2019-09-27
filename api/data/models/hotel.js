'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

// Schema for the review nested document
var ReviewSchema = new mongoose.Schema({
	name: { 
		type: String,
		required: true // Setting this property as required
	},
	rating: {
		type: Number,
		min: 0,
		max: 5,
		required: true
	},
	review: { 
		type: String,
		required: true
	},
	createOn: { 
		type: Date,
		'default': Date.now 
	}
});

// Schema for the room nested document
var RoomSchema = new mongoose.Schema({
	type: String,
	number: Number,
	description: String,
	photos: [String],
	price: Number
});


// The nested schemas should be defined before the schema that will use themx
var HotelSchema = new mongoose.Schema({
	name: { 
		type: String,
		required: true // Setting this property as required
	},
	stars: {
		type: Number,
		min: 0,
		max: 5,
		'default': 0
	},
	services: [String],
	description: String,
	photos: [String],
	currency: String,
	reviews: [ReviewSchema],
	rooms: [RoomSchema],
	location: {
		address: String,
		// Always store coordinates longitude (E/W), latitude (N/S) order
		coordinates: { 
			type: [Number],
			index: '2dsphere' // Defining a sphere index type for the coordinates properties  
		}
	}
});

// Creating the Model (compilation of the Schema)
mongoose.model('Hotel', HotelSchema);