var app = angular.module( 'COREAPI', [] );
app.controller( 'LogoutController', function( $scope, $http, $window , LogService, Redirect, Const) {

console.log("sdaf");

	var res = $http.post( Const.authApiPath + '/logout' );

	res.success( function( data, status, headers, config ) {
		Redirect.login();
	} );
	res.error( function( data, status, headers, config ) {
			console.log( 'error' );
			Redirect.login();
	} );

});
