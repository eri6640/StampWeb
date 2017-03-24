var app = angular.module( 'COREAPI', [] );
app.controller( 'ProfileController', function( $scope, $http, $window) {

	$scope.test = 'testejam';

	$scope.errorData = {
		error : false,
		message : 'error?'
	};



});
app.factory( 'stampAdd', function($location, $http, $rootScope, Const) {
  var add = function( ) {
    return $http.post( Const.authApiPath + '/stampAdd', {

    } );
  };

    return {
      add : add
    };

} );
