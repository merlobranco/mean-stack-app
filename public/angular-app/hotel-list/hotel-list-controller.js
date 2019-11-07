'use strict'

angular.module('meanhotel').controller('HotelsController', HotelsController);

function HotelsController(HotelDataFactory) {
	var vm = this;
	vm.title = 'MEAN Hotel App';
	vm.hotels = HotelDataFactory.getAllHotels();
	HotelDataFactory.getAllHotels().then((response) => {
		vm.hotels = response;
	});
}