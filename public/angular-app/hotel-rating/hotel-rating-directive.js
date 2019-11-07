'use strict'

// It will become <hotel-rating> in our html
// angular.module('meanhotel').directive('hotelRating', hotelRating);

// function hotelRating() {
// 	return {
// 		restrict: 'E', // E: This directive will be used as an element, 'A' as an attribute, 'EA' as both
// 		template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>', // track by $index is required if the array contains identical elements
// 		bindToController: true, // We are going to use the value in vm.hotel.stars
// 		controller: 'HotelController',
// 		controllerAs: 'vm',
// 		scope: {
// 			stars: '@' // '=' accessing the attribute through the value, '@' for objects or arrays, '&' for functions 
// 		}
// 	}
// }

angular.module('meanhotel').component('hotelRating', {
	bindings: {
		stars: '='
	},
	template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>', // track by $index is required if the array contains identical elements
	controller: 'HotelController',
	controllerAs: 'vm'
});