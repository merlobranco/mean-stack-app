'use strict'

angular.module('meanhotel').controller('HotelController', HotelController);

function HotelController($route, $routeParams, HotelDataFactory) {
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

	vm.addReview = function() {
		var postData = {
			name: vm.name,
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