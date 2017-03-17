var app = angular.module( 'COREAPI', [] );
app.controller( 'LoginController', function( $scope, $http, $window , LogService, sha256, $cookieStore, AuthService) {

	$scope.errorData = {
		error : false,
		message : 'error?'
	};

	$scope.doLog = function(){

var username = $scope.username;
var password = $scope.password;

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
			password = sha256.convertToSHA256(password);

			var res = LogService.login( username, password, AuthService.getToken());

			res.success( function( data, status, headers, config ) {

					$scope.reg = data;
					console.log('Response ' + data.success + ' ' + data.message);

			} );
			res.error( function( data, status, headers, config ) {
					console.log( 'error' );
			} );
		}
	};

});

app.factory( 'LogService', function( $http, Const ) {

	 var login = function( username, password, token ) {
		 return $http.post( Const.authApiPath + '/login', {
				 username : username,
				 password : password,
				 token : token
		 } );
	 };

	 return {
		 login : login
	 };

} );
