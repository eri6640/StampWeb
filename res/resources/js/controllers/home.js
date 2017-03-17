var app = angular.module( 'COREAPI', [] );
app.controller( 'HomeController', function( $scope, $http, $window, NewestUserLoad ) {

	$scope.test = 'testejam';

	$scope.errorData = {
		error : false,
		message : 'error?'
	};
	NewestUserLoad.load();

});
app.factory( 'NewestUserLoad', function($location, $http, $rootScope, Const) {

  var load = function(){

		var res = $http.post( Const.userApiPath + '/getNewestUsers' );

		res.success( function( data, status, headers, config ) {

				if(data.success == true){
					$rootScope.newestUsers = data.userList;
				}
				else {
					$rootScope.errorData.error = true;
					$rootScope.errorData.message = data.massage;
				}
		} );
		res.error( function( data, status, headers, config ) {
		    console.log( 'error' );
		} );

  }

  return {
    load: load
  };
});
