'use strict'

var express = require('express');
// Instantiating the express router
var router = express.Router();

var HotelsController = require('../controllers/hotels');
var ReviewsController = require('../controllers/reviews');
var UsersController = require('../controllers/users');

// Adding routes to the router with the path we want to map and te method we want to use
// Sending a json object
router.get('/hotels', UsersController.authenticate, HotelsController.getAll);
router.post('/hotels', HotelsController.addHotel);
// Shorcut for
// router
// 	.route('/hotels')
// 	.get(HotelsController.getAll)
//	.post(HotelsController.addHotel);
router.get('/hotels/:id', HotelsController.getHotel);
router.put('/hotels/:id', HotelsController.updateHotel);
router.delete('/hotels/:id', HotelsController.deleteHotel);



// Reviews routes
router.get('/hotels/:id/reviews', ReviewsController.getAll);
router.post('/hotels/:id/reviews', ReviewsController.addReview);

router.get('/hotels/:id/reviews/:reviewId', ReviewsController.getReview);
router.put('/hotels/:id/reviews/:reviewId', ReviewsController.updateReview);
router.delete('/hotels/:id/reviews/:reviewId', ReviewsController.deleteReview);

// Authentication
// 
router.post('/users/register', UsersController.register);
router.post('/users/login', UsersController.login);

// Exporting the instatiated router
module.exports = router;