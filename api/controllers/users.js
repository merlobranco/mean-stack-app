'use strict'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
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
			if (err) {
				console.log('Error finding the user');
				res.status(500).json(err);
			} 
			else if (!user) {
				res.status(404).json({'message': 'User identified by ' + username + ' does not exist'});
			}
			else if (!bcrypt.compareSync(password, user.password)) {
				res.status(401).json({'message': 'Unauthorized'});
			}
			else {
				// We should provide the payload, secret (Should be better hidden) and the expiration (In this case 1 hour)
				var token = jwt.sign({ username: user.username}, 's3cr3t', { expiresIn: 3600 });
				res.status(200).json({ 'success': true, 'token': token });
			}
		});
}

/**
 * Creating our authenticate middleware
 */
var authenticate = function(req, res, next) {
	var header = req.headers.authorization;
	if (header) {
		var token = header.split(' ')[1]; //--> Authorization Bearer xxx <- We want the xxx part
		jwt.verify(token, 's3cr3t', (error, decoded) => {
			if (error) {
				console.log(error);
				res.status(401).json({'message': 'Unauthorized'});
			}
			else {
				// Accesing to the username property we added previously on the payload of the web token
				req.user = decoded.username;
				next(); // Next function that will be executed
			}
		});
	}
	else {
		res.status(403).json({'message': 'No token provided'});
	}
}

module.exports = {
	register,
	login,
	authenticate
};