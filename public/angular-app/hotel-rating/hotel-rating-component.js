'use strict'

angular.module('meanhotel').component('hotelRating', {
	bindings: {
		stars: '='
	},
	template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>', // track by $index is required if the array contains identical elements
	controller: 'HotelController',
	controllerAs: 'vm'
});