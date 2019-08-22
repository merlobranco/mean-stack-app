'use strict'

var express = require('express');
// Instantiating the express router
var router = express.Router();

var HotelsController = require('../controllers/hotels');

// Adding routes to the router with the path we want to map and te method we want to use
// Sending a json object
router.get('/hotels', HotelsController.getAll);

router.get('/hotels/:id', HotelsController.getHotel);

// Exporting the instatiated router
module.exports = router;