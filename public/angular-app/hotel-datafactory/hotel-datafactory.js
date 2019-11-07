'use strict'

angular.module('meanhotel').factory('HotelDataFactory', HotelDataFactory);

function HotelDataFactory($http) {
	return {
		getAllHotels: getAllHotels,
		getHotel: getHotel
	};

	function getAllHotels() {
		return $http.get('/api/hotels?count=10').then(complete).catch(failed);

	// 	$http.get('api/hotels?count=10').then((response) => {
	// 	vm.hotels = response.data;
	// });
	}

	function getHotel(id) {
		return $http.get('/api/hotels/' + id).then(complete).catch(failed);
	// 	$http.get('api/hotels/' + id).then((response) => {
	// 	vm.hotel = response.data;
	// });
	}

	function complete(response) {
		return response.data;
	}
	function failed(error) {
		return error.statusText;
	}
}