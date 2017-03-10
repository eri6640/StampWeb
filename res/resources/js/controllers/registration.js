var app = angular.module( 'COREAPI', [] );
app.controller( 'RegController', function( $scope, $http, $window ) {

	$scope.errorData = {
		error : false,
		message : 'error?'
	};

	$scope.doReg = function(){

		var username = $scope.username;
		var email = $scope.email;
		var password = ...;

		if( typeof username === 'undefined' || !username ){
			$scope.errorData.error = true;
			$scope.errorData.message = 'asdfd';

		}



	};

});
