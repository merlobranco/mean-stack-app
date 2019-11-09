'use strict'

angular.module('meanhotel').controller('RegisterController', RegisterController);

function RegisterController(HotelDataFactory) {
  	var vm = this;

	vm.register = function() {
	    var user = {
	      	username: vm.username,
	      	password: vm.password
	    };

	    if (!vm.username || !vm.password) {
	    	vm.error = 'Please add a username and a password.';
	    } else {
	      	if (vm.password !== vm.passwordRepeat) {
	        	vm.error = 'Please make sure the passwords match.';
	      	} else {
	        	HotelDataFactory.postUser(user).then((response) =>{
	          		console.log(response);
	          		vm.message = 'Successful registration, please login.';
	          		vm.error = '';
	       		}).catch((error)=>{
	          		console.log(error);
	        	});
	      	}
	    }
	}
};
