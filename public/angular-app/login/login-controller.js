'use strict'

angular.module('meanhotel').controller('LoginController', LoginController);

function LoginController(UserDataFactory, $location, $window, AuthFactory) {
	var vm = this;

	vm.isLoggedIn = function () {
		if (AuthFactory.isLoggedIn) {
			return true;
		} else {
			return false;
		}
	};

	vm.login = function() {
		if (!vm.username || !vm.password)
			return;

		console.log('Logging...');

  		var user = {
    		username: vm.username,
    		password: vm.password
  		};

  		UserDataFactory.postLogin(user).then((response) => {
    		console.log(response);
  		}).catch((error) => {
    		console.log(error);
  		})


  		// $http.post('/api/users/login', user).then((response) => {
    // 		console.log(response);
  		// }).catch((error) => {
    // 		console.log(error);
  		// })

	};

	vm.logout = function() {
	};

	// Managing the navigation
	// Creating different tab styles
	vm.isActiveTab = function(url) {
    	var currentPath = $location.path().split('/')[1];
    	return (url === currentPath ? 'active' : '');
  	}

}