'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

// Schema for the review nested document
var UserSchema = new mongoose.Schema({
	username: { 
		type: String,
		unique: true,
		required: true // Setting this property as required
	},
	name: {
		type: String
	},
	password: { 
		type: String,
		required: true
	}
});

// Creating the User (compilation of the Schema)
mongoose.model('User', UserSchema);