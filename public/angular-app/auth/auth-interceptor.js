'use strict'

angular.module('meanhotel').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($window) {
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

	}

	function responseError(rejection) {

	}

}