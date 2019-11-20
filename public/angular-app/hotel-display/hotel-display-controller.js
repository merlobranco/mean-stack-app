'use strict'

angular.module('meanhotel').controller('HotelController', HotelController);

function HotelController($route, $routeParams, $window, HotelDataFactory, AuthFactory, jwtHelper) {
	var vm = this;
	var id = $routeParams.id;
	vm.isSubmitted = false;
	HotelDataFactory.getHotel(id).then((response) => {
		vm.hotel = response.data;
		vm.stars = _getStarRating(response.stars);
	});

	// Transforming the stars number value to an array
	function _getStarRating(stars) {
		return new Array(stars);
	};

	vm.isLoggedIn = function() {
    	return AuthFactory.isLoggedIn;
  	};

	vm.addReview = function() {
		var token = jwtHelper.decodeToken($window.sessionStorage.token);
		// Getting the username from the token payload
    	var username = token.username;

		var postData = {
			name: username,
			rating: vm.rating,
			review: vm.review
		};
		if (vm.reviewForm.$valid) {
			HotelDataFactory.postReview(id, postData).then((response)=>{
				if (response.status === 201) {
					$route.reload(); // Refreshing the page after the post operation
				}
			}).catch((error)=>{
				console.log(error);
			});
		} else {
			vm.isSubmitted = true;
		}
	};
}