'use strict'

var express = require('express');
// Instantiating the express router
var router = express.Router();

var HotelsController = require('../controllers/hotels');
var ReviewsController = require('../controllers/reviews');

// Adding routes to the router with the path we want to map and te method we want to use
// Sending a json object
router.get('/hotels', HotelsController.getAll);

router.get('/hotels/:id', HotelsController.getHotel);

router.post('/hotels', HotelsController.addHotel);

// Reviews routes
router.get('/hotels/:id/reviews', ReviewsController.getAll);

router.get('/hotels/:id/reviews/:reviewId', ReviewsController.getReview);

// Exporting the instatiated router
module.exports = router;