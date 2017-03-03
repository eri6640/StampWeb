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
	
    $routeProvider.when( '/login', {
		controller : 'LoginController',
		templateUrl : 'templates/login.html',
		resolve : {
			lazy : [ '$ocLazyLoad', function( $ocLazyLoad ) {
			return $ocLazyLoad.load( [ {
				name : 'COREAPI',
				files : [ 'resources/js/controllers/' + 'login.js' ]
			} ] );
			} ]
		}
    } );
	
    $routeProvider.when( '/reg', {
		controller : 'RegController',
		templateUrl : 'templates/reg.html',
		resolve : {
			lazy : [ '$ocLazyLoad', function( $ocLazyLoad ) {
			return $ocLazyLoad.load( [ {
				name : 'COREAPI',
				files : [ 'resources/js/controllers/' + 'reg.js' ]
			} ] );
			} ]
		}
    } );
	
    $routeProvider.when( '/profile', {
		controller : 'ProfileController',
		templateUrl : 'templates/profile.html',
		resolve : {
			lazy : [ '$ocLazyLoad', function( $ocLazyLoad ) {
			return $ocLazyLoad.load( [ {
				name : 'COREAPI',
				files : [ 'resources/js/controllers/' + 'profile.js' ]
			} ] );
			} ]
		}
    } );
	
    $routeProvider.when( '/search', {
		controller : 'SearchController',
		templateUrl : 'templates/search.html',
		resolve : {
			lazy : [ '$ocLazyLoad', function( $ocLazyLoad ) {
			return $ocLazyLoad.load( [ {
				name : 'COREAPI',
				files : [ 'resources/js/controllers/' + 'search.js' ]
			} ] );
			} ]
		}
    } );
	
    $routeProvider.when( '/stamp', {
		controller : 'StampController',
		templateUrl : 'templates/stamp.html',
		resolve : {
			lazy : [ '$ocLazyLoad', function( $ocLazyLoad ) {
			return $ocLazyLoad.load( [ {
				name : 'COREAPI',
				files : [ 'resources/js/controllers/' + 'stamp.js' ]
			} ] );
			} ]
		}
    } );
	
    $routeProvider.when( '/stamp/:id/add', {
		controller : 'StampAddController',
		templateUrl : 'templates/stampAdd.html',
		resolve : {
			lazy : [ '$ocLazyLoad', function( $ocLazyLoad ) {
			return $ocLazyLoad.load( [ {
				name : 'COREAPI',
				files : [ 'resources/js/controllers/' + 'stampAdd.js' ]
			} ] );
			} ]
		}
    } );
	
    $routeProvider.when( '/stamp/:id/del', {
		controller : 'StampDelController',
		templateUrl : 'templates/stampDel.html',
		resolve : {
			lazy : [ '$ocLazyLoad', function( $ocLazyLoad ) {
			return $ocLazyLoad.load( [ {
				name : 'COREAPI',
				files : [ 'resources/js/controllers/' + 'stampDel.js' ]
			} ] );
			} ]
		}
    } );
	
    $routeProvider.when( '/about', {
		controller : 'AboutController',
		templateUrl : 'templates/about.html',
		resolve : {
			lazy : [ '$ocLazyLoad', function( $ocLazyLoad ) {
			return $ocLazyLoad.load( [ {
				name : 'COREAPI',
				files : [ 'resources/js/controllers/' + 'about.js' ]
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

