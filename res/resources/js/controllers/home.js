var app = angular.module( 'COREAPI', [] );
app.controller( 'HomeController', function( $scope, $http, $window, LoadService ) {

	$scope.test = 'testejam';

	$scope.errorData = {
		error : false,
		message : 'error?'
	};
	LoadService.load();

});

	app.factory( 'LoadService', function($location, $http, $rootScope, Const) {

		var load = function(){

			loadUsers();
			loadNews();

		};

	  var loadUsers = function(){

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
		var loadNews = function(){

			var res = $http.post( Const.newsApiPath + '/getAll' );

			res.success( function( data, status, headers, config ) {

					if(data.success == true){
						$rootScope.storyList = data.storyList;
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
