'use strict';

var app = angular.module( 'COREAPI', [ 'ngRoute', 'ngAnimate', 'ngCookies', 'oc.lazyLoad', 'angular-encryption' ] );

app.constant( 'Const', {

    // api
    authApiPath : "http://94.23.206.157:8090/api/auth",

} );

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

    $routeProvider.when( '/registration', {
	controller : 'RegController',
	templateUrl : 'templates/registration.html',
	resolve : {
	    lazy : [ '$ocLazyLoad', function( $ocLazyLoad ) {
		return $ocLazyLoad.load( [ {
		    name : 'COREAPI',
		    files : [ 'resources/js/controllers/' + 'registration.js' ]
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
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';

    angular.isEmpty = function( value ) {
	return angular.isUndefined( value ) || value === null || value === '';
    };
    angular.isTooShort = function( value, len ) {
	return value.length <= len;
    };

} );

function guid() {
    function s4() {
	return Math.floor( (1 + Math.random()) * 0x10000 ).toString( 16 ).substring( 1 );
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

app.run( function( $rootScope, $route, $window, $location, $cookieStore, $cookies, Const, AuthService ) {

    $rootScope.$on( '$locationChangeStart', function( evt, next, current ) {

	var sessionKey = $cookieStore.get( 'token' );
	$rootScope.isLoggedIn = $cookieStore.get( 'isLoggedIn' );

	console.log('asdf');

	if ( angular.isUndefined( sessionKey ) || sessionKey === null ) {

	    sessionKey = guid();
	    $rootScope.isLoggedIn = false;

	    var expireDate = new Date();

	    expireDate.setDate( expireDate.getDate() + 1 );

	    $cookieStore.put( 'token', sessionKey, {
		'expires' : expireDate
	    } );

	}

	var authRes = AuthService.getSession( sessionKey );

	authRes.success( function( data, status, headers, config ) {

	    // $cookieStore.put( 'isLoggedIn', data );

	    $rootScope.auth = data;
	    console.log('Response ' + data.success + ' ' + data.message);
	    console.log('Response message' + data.message);

	} );
	authRes.error( function( data, status, headers, config ) {
	    console.log( 'error' );
	} );

    } );

} );

/**
 *
 * FACTORY
 *
 */

app.factory( 'AuthService', function( $http, Const ) {

    var getSession = function( value ) {
	return $http.post( Const.authApiPath + '/getSession', {
	    token : value
	} );
    };
    var logout = function() {
	return $http.post( Const.authApiPath + '/doLogout' );
    };
    var getToken = function() {
      return $cookieStore.get( 'token' );

    }
    return {
	getSession : getSession,
	logout : logout,
  getToken: getToken
    };

} );




app.controller( 'LogoutController', function( $scope, AuthService) {
  $scope.doLogout = function(){

    var authRes = AuthService.doLogout( sessionKey );

  	authRes.success( function( data, status, headers, config ) {


  	    console.log('Logout success');

  	} );
  	authRes.error( function( data, status, headers, config ) {
  	    console.log( 'error' );
  	} );
  };

});
