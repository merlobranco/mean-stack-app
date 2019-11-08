'use strict'

angular.module('meanhotel').factory('HotelDataFactory', HotelDataFactory);

function HotelDataFactory($http) {
	return {
		getAllHotels: getAllHotels,
		getHotel: getHotel,
		postReview: postReview
	};

	function getAllHotels() {
		return $http.get('/api/hotels?count=10').then(complete).catch(failed);
	}

	function getHotel(id) {
		return $http.get('/api/hotels/' + id).then(complete).catch(failed);
	}

	function postReview(id,review) {
		return $http.post('/api/hotels/' + id + '/reviews', review).then(complete).catch(failed);
	}

	function complete(response) {
		return response.data;
	}
	function failed(error) {
		return error.statusText;
	}
}