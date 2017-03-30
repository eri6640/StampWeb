var app = angular.module( 'COREAPI', [] );
app.controller( 'StampsController', function( $scope, $http, $window, LoadService, StampCollectionService) {

	$scope.stampName = '';

	$scope.errorData = {
		error : false,
		message : 'error?'
	};

	$scope.search = LoadService.search;

$scope.search( "" );
$scope.addToCollection = StampCollectionService.add;
	});
	app.factory( 'StampCollectionService', function($location, $http, $rootScope, Const) {

		var add = function( stampId ){
			var data = {stampId: stampId};
			var res = $http.post( Const.userApiPath + '/addStampToCollection', data );

			res.success( function( data, status, headers, config ) {

					$rootScope.addResp = data;

			} );
			res.error( function( data, status, headers, config ) {
					console.log( 'error' );
			} );
		}
		return {
			add: add
		};

	});


	app.factory( 'LoadService', function($location, $http, $rootScope, Const) {

		var search = function( stampName ){

			console.log('stampName ' + stampName);

			var data = {name: stampName};
			var res = $http.post( Const.stampsApiPath + '/search', data );

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
			search: search
		};

	});
