var express = require('express');
// Instantiating the express router
var router = express.Router();

// Adding routes to the router with the path we want to map and te method we want to use
// Sending a json object
router.get('/json', (req, res) => {
		console.log('GET the json');
		res
			.status(200)
			.json({'jsonData': true});
	});
router.post('/json', (req, res) => {
		console.log('POST the json route');
		res
			.status(200)
			.json({'jsonData': 'POST received'});
	});

// Another way of expressing the above GET route
// router
// 	.route('/json')
// 	.get((req, res) => {
// 		console.log('GET the json route');
// 		res
// 			.status(200)
// 			.json({'jsonData': true});
// 	});
// 	In other to support also POST calls on the same route
// 	.post((req, res) => {
// 		console.log('POST the json route');
// 		res
// 			.status(200)
// 			.json({'jsonData': 'POST received'});
// 	});


// Sending a file
router.get('/file', (req, res) => {
		console.log('GET the file');
		res
			.status(200)
			.sendFile(path.join(__dirname, 'app.js'));
	});

// Exporting the instatiated router
module.exports = router;