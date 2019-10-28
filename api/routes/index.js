'use strict'

var express = require('express');
// Instantiating the express router
var router = express.Router();

var HotelsController = require('../controllers/hotels');
var ReviewsController = require('../controllers/reviews');

// Adding routes to the router with the path we want to map and te method we want to use
// Sending a json object
router.get('/hotels', HotelsController.getAll);
router.post('/hotels', HotelsController.addHotel);
// Shorcut for
// router
// 	.route('/hotels')
// 	.get(HotelsController.getAll)
//	.post(HotelsController.addHotel);
router.get('/hotels/:id', HotelsController.getHotel);
router.put('/hotels/:id', HotelsController.updateHotel);



// Reviews routes
router.get('/hotels/:id/reviews', ReviewsController.getAll);
router.post('/hotels/:id/reviews', ReviewsController.addReview);

router.get('/hotels/:id/reviews/:reviewId', ReviewsController.getReview);
router.put('/hotels/:id/reviews/:reviewId', ReviewsController.updateReview);

// Exporting the instatiated router
module.exports = router;