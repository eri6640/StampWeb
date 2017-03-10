var app = angular.module( 'COREAPI', [] );
app.controller( 'LoginController', function( $scope, $http, $window , LogService) {

	$scope.errorData = {
		error : false,
		message : 'error?'
	};

	$scope.doLog = function(){

		if( angular.isEmpty(username) ){
			$scope.errorData.error = true;
			$scope.errorData.message = 'Username cannot be empty!';
		}
		else if( angular.isEmpty(password) ){
			$scope.errorData.error = true;
			$scope.errorData.message = 'Password cannot be empty!';
		}
		/*
		else if(){
			$scope.errorData.error = true;
			$scope.errorData.message = 'Invalid username or password';
		}
		*/
		else{
			var res = LogService.reg( username, password );

			res.success( function( data, status, headers, config ) {

					$rootScope.reg = data;
					console.log('Response ' + data.success + ' ' + data.message);

			} );
			res.error( function( data, status, headers, config ) {
					console.log( 'error' );
			} );
		}
	};

});

app.factory( 'LogService', function( $http, Const ) {

	 var getSession = function( username, password ) {
		 return $http.post( Const.authApiPath + '/login', {
				 username : username,
				 password : password
		 } );
	 };

	 return {
		 reg : reg
	 };

} );
