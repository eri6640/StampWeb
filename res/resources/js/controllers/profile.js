var app = angular.module( 'COREAPI', [] );
app.controller( 'ProfileController', function( $scope, $http, $window, $routeParams, $rootScope, Redirect, Const, UserStamps) {

	var profileName = $routeParams.userName;
	$rootScope.profile;

	console.log('profileName ' + profileName);

	$scope.errorData = {
		error : false,
		message : 'error?'
	};
	if (angular.isNull(profileName)) {
		// my profile
		$scope.$watch('userData', function () {
			if(!angular.isNull($rootScope.userData)){
				$rootScope.profile = $rootScope.userData;
				UserStamps.load($rootScope.userData.username);
			}
		});
	} else {
		// load profile

		var data = {
			username : profileName
		};

		var res = $http.post(Const.userApiPath + '/getUserByUsername', data);
		res.success(function (data, status, headers, config) {
			var body = data;

			if(body.success){
				$rootScope.profile = body.userData;
				UserStamps.load(body.userData.username);
			}
			else{
				console.log('error ' + body.message);
				Redirect.home();
			}

		});
		res.error(function (data, status, headers, config) {
			console.log('Basic error... cant access...');
		});
	}
});

app.factory( 'UserStamps', function($location, $http, $rootScope, Const) {
  var load = function( username) {
		var data = {
			username : username
		};
		var res = $http.post(Const.stampsApiPath + '/getUserStamps', data);
		res.success(function (data, status, headers, config) {
			var body = data;
			$rootScope.stampList = body.stampList;
		});
		res.error(function (data, status, headers, config) {
			console.log('Basic error... cant access...');
		});
  };

    return {
      load : load
    };

} );
