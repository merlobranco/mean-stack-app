'use strict'

angular.module('meanhotel').controller('LoginController', LoginController);

function LoginController(UserDataFactory, $location, $window, AuthFactory, jwtHelper) {
	var vm = this;

	vm.isLoggedIn = function () {
		return AuthFactory.isLoggedIn;
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
  			if (response.data.success) {
  				// Storing the token in the Browser session storage
	    		$window.sessionStorage.token = response.data.token;
	          	AuthFactory.isLoggedIn = true;
	          	var token = $window.sessionStorage.token;
				var decodedToken = jwtHelper.decodeToken(token);
				// Accesing to the username property we added previously on the payload of the web token
				vm.loggedInUser = decodedToken.username;
	  		}
  		}).catch((error) => {
    		console.log(error);
  		})
	};

	vm.logout = function() {
		AuthFactory.isLoggedIn = false;
		// Deleting the token in the Browser session storage
    	delete $window.sessionStorage.token;
    	$location.path('/');
	};

	// Managing the navigation
	// Creating different tab styles
	vm.isActiveTab = function(url) {
    	var currentPath = $location.path().split('/')[1];
    	return (url === currentPath ? 'active' : '');
  	}

}