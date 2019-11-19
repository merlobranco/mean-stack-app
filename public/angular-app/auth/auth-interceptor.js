'use strict'

angular.module('meanhotel').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($location, $q, $window, AuthFactory) {
	return {
		request: request,
		response: response,
		responseError: responseError
	};

	function request(config) {
		config.headers = config.headers || {};
		// Trying to access the token in the browser session storage
		// If it is there we will attach the token to the request using the authorization header
		if ($window.sessionStorage.token) {
			// Sending the authorization header is the way we expected
			config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
		}
		return config;
	}

	function response(response) {
    	if (response.status === 200 && $window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      		AuthFactory.isLoggedIn = true;
    	}
    	if (response.status === 401) {
      		AuthFactory.isLoggedIn = false;
    	}
    	return response || $q.when(response);
  	}

	function responseError(rejection) {
    	if (rejection.status === 401 || rejection.status === 403) {
    		delete $window.sessionStorage.token;
      		AuthFactory.isLoggedIn = false;
      		$location.path('/');
    	}
    	return $q.reject(rejection);
  	}
}