var app = angular.module( 'COREAPI', [] );
app.controller( 'RegController', function( $scope, $http, $window, RegService, sha256 ) {

	$scope.errorData = {
		error : false,
		message : 'error?'
	};

	$scope.doReg = function(Redirect){

		var username = $scope.username;
		var name = $scope.name;
		var surname = $scope.surname;
		var email = $scope.email;
		var password = $scope.password;
		var password2 = $scope.password2;


		if( angular.isEmpty(username) ){
			$scope.errorData.error = true;
			$scope.errorData.message = 'Username cannot be empty!';
		}
		else if( angular.isTooShort(username, 4) ){
			$scope.errorData.error = true;
			$scope.errorData.message = 'Username too short!';
		}
		else if( angular.isEmpty(name) ){
			$scope.errorData.error = true;
			$scope.errorData.message = 'Name cannot be empty!';
		}
		else if( angular.isTooShort(name, 3) ){
			$scope.errorData.error = true;
			$scope.errorData.message = 'Name too short!';
		}
		else if( angular.isEmpty(surname) ){
			$scope.errorData.error = true;
			$scope.errorData.message = 'Surname cannot be empty!';
		}
		else if( angular.isTooShort(surname, 2) ){
			$scope.errorData.error = true;
			$scope.errorData.message = 'Surname too short!';
		}
		else if( angular.isEmpty(email) ){
			$scope.errorData.error = true;
			$scope.errorData.message = 'Email cannot be empty!';
		}
		else if( angular.isTooShort(email, 5) ){
			$scope.errorData.error = true;
			$scope.errorData.message = 'Email too short!';
		}
		else if( angular.isEmpty(password) ){
			$scope.errorData.error = true;
			$scope.errorData.message = 'Password cannot be empty!';
		}
		else if( angular.isTooShort(password, 5) ){
			$scope.errorData.error = true;
			$scope.errorData.message = 'Password too short!';
		}
		else if(password != password2){
			$scope.errorData.error = true;
			$scope.errorData.message = 'Passwords do not match!';
		}
		else{

			password = sha256.convertToSHA256(password);

			var res = RegService.reg( username, name, surname, email, password );

			res.success( function( data, status, headers, config ) {

			    $scope.reg = data;
			    console.log('Response ' + data.success + ' ' + data.message);

					if(data.success == true){

		        Redirect.login();
		      }
					else{
						$scope.errorData.error = true;
						$scope.errorData.message = data.massage;
					}

			} );
			res.error( function( data, status, headers, config ) {
			    console.log( 'error' );
			} );

		}



	};

});

app.factory( 'RegService', function( $http, Const ) {

	 var reg = function( username, name, surname, email, password ) {
		 return $http.post( Const.authApiPath + '/reg', {
				 username : username,
				 name : name,
				 surname : surname,
				 email : email,
				 password : password
		 } );
	 };

	 return {
		 reg : reg
	 };

} );
