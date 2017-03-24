var app = angular.module( 'COREAPI', [] );
app.controller( 'StampsController', function( $scope, $http, $window, LoadService) {

	$scope.test = 'testejam';

	$scope.errorData = {
		error : false,
		message : 'error?'
	};

	$scope.search = function(){
		LoadService.load();
	};

$scope.search();

	});

	app.factory( 'LoadService', function($location, $http, $rootScope, Const) {

		var load = function(){

			var data = {name: $rootScope.stampName};
			var res = $http.post( Const.stampsApiPath + '/search' );

			res.success( function( data, status, headers, config ) {

					if(data.success == true){
						$rootScope.stampList = data.stampList;
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
