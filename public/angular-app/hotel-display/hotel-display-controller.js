'use strict'

angular.module('meanhotel').controller('HotelController', HotelController);

function HotelController($routeParams, HotelDataFactory) {
	var vm = this;
	var id = $routeParams.id;
	HotelDataFactory.getHotel(id).then((response) => {
		vm.hotel = response;
		vm.stars = _getStarRating(response.stars);
	});

	// Transforming the stars number value to an array
	function _getStarRating(stars) {
		return new Array(stars);
	}
}