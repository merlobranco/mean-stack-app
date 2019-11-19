'use strict'

angular.module('meanhotel').factory('UserDataFactory', UserDataFactory);

function UserDataFactory($http) {
	return {
		postUser: postUser,
		postLogin: postLogin
	};

	function postUser(user) {
		return $http.post('/api/users/register', user).then(complete).catch(failed);
	}

	function postLogin(user) {
		return $http.post('/api/users/login', user).then(complete).catch(failed);
	}

	function complete(response) {
		return response;
	}
	function failed(error) {
		return error.statusText;
	}
}