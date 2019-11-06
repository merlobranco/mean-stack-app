'use strict'

angular.module('meanhotel').controller('HotelsController', HotelsController);

function HotelsController($http) {
	var vm = this;
	vm.title = 'MEAN Hotel App';
	$http.get('api/hotels?count=10').then((response) => {
		vm.hotels = response.data;
	});
}