'use strict'

var mongoose = require('mongoose'); 
var dburl = 'mongodb://localhost:27017/mean-hotel';

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// Listening to the connected event
mongoose.connection.on('connected', () => {
	console.log('Mongoose connected to ' + dburl);
});

// Listening to the disconnected event
mongoose.connection.on('disconnected', () => {
	console.log('Mongoose disconnected from ' + dburl);
});

// Listening to the error event
mongoose.connection.on('error', (err) => {
	console.log('Mongoose connection error ' + err);
});

// The following events suppose to be working only on unix systems like MAC or Linux,
// Looks like also are working on Windows
process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		console.log('Mongoose disconnected through app termination (SIGINT)');
		process.exit(0);
	});
});

// Event submitted by various platform service provider like Heroku
//
process.on('SIGTERM', () => {
	mongoose.connection.close(() => {
		console.log('Mongoose disconnected through app termination (SIGTERM)');
		process.exit(0);
	});
});

// In order to listen to restart command 'rs'
// It should be captured once instead of on, and kill the process intead of exit
// Since we want to restart the application, no stop it completely
process.once('SIGUSR2', () => {
	mongoose.connection.close(() => {
		console.log('Mongoose disconnected through app termination (SIGUSR2)');
		process.kill(process.pid, 'SIGUSR2');
	});
});

// Bring in Schemas and Models
require('./models/hotel');
require('./models/user');