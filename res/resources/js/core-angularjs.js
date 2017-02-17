'use strict';

var app = angular.module( 'COREAPI', [ 'ngRoute', 'ngAnimate', 'oc.lazyLoad' ] );

app.config( function( $routeProvider, $httpProvider, $locationProvider ) {

    $locationProvider.html5Mode( true );

    $routeProvider.when( '/home', {
		controller : 'HomeController',
		templateUrl : 'templates/home.html',
		resolve : {
			lazy : [ '$ocLazyLoad', function( $ocLazyLoad ) {
			return $ocLazyLoad.load( [ {
				name : 'COREAPI',
				files : [ 'resources/js/controllers/' + 'home.js' ]
			} ] );
			} ]
		}
    } );
	
    $routeProvider.when( '/test', {
		controller : 'HomeController',
		templateUrl : 'templates/test.html',
		resolve : {
			lazy : [ '$ocLazyLoad', function( $ocLazyLoad ) {
			return $ocLazyLoad.load( [ {
				name : 'COREAPI',
				files : [ 'resources/js/controllers/' + 'home.js' ]
			} ] );
			} ]
		}
    } );

    $routeProvider.when( '/', {
		redirectTo : '/home'
    } );

    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.common['Accept'] = 'application/json';

} );

app.controller( 'HomeController', function( $scope, $http, $window ) {
	
	$scope.test = 'testejam';
	  
	  
});

