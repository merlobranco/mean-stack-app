'use strict'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var User = mongoose.model('User');

var register = function(req, res) {
	console.log('Registering user');

	var username = req.body.username;
	var name = req.body.name || null;
	var password = req.body.password; 

	User
		.create({
			username: username,
			name: name,
			password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
		}, (err, user) => {
			if (err) {
				console.log('Error creating user');
				res
					.status(500)
					.json(err);
			}
			else {
				console.log('User created ', user);
				res
					.status(201)
					.json(user);

			}
		});
}

var login = function(req, res) {
	console.log('Logging user');

	var username = req.body.username;
	var password = req.body.password;

	User
		.findOne({
			// We are only using the username since we set it unique on the database
			username: username
		})
		.exec((err, user) => {
			var response = {
				status: 200,
				message: user
			};
			if (err) {
				console.log('Error finding the user');
				response.status = 500;
				response.message = err;
			} 
			else if (!user) {
				response.status = 404;
				response.message = {'message': 'User identified by ' + username + ' does not exist'};
			}
			else if (!bcrypt.compareSync(password, user.password)) {
				response.status = 401;
				response.message = {'message': 'Unauthorized'};
			}
			res
				.status(response.status)
				.json(response.message);
		});		 

}

module.exports = {
	register,
	login
};