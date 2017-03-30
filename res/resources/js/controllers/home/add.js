var app = angular.module( 'COREAPI', [] );
app.controller( 'HomeAddController', function( $scope, $http, $window ,AddService) {

	$scope.test = 'testejam';

	$scope.errorData = {
		error : false,
		message : 'error?'
	};

  $scope.save = function(Redirect){

    var title = $scope.title;
    var content = $scope.content;



    if( angular.isEmpty(title) ){
      $scope.errorData.error = true;
      $scope.errorData.message = 'title cannot be empty!';
    }
    else if( angular.isTooShort(title, 4) ){
      $scope.errorData.error = true;
      $scope.errorData.message = 'title too short!';
    }
    else if( angular.isEmpty(content) ){
      $scope.errorData.error = true;
      $scope.errorData.message = 'content cannot be empty!';
    }
    else if( angular.isTooShort(content, 4) ){
      $scope.errorData.error = true;
      $scope.errorData.message = 'content too short!';
    }


    else{

      var res = AddService.reg( title, content );
      res.success( function( data, status, headers, config ) {

          $scope.reg = data;
          console.log('Response ' + data.success + ' ' + data.message);
          $scope.errorData.error = true;
          $scope.errorData.message = data.massage;

      } );
      res.error( function( data, status, headers, config ) {
          console.log( 'error' );
      } );

    }
  };

  });

  app.factory( 'AddService', function( $http, Const ) {

   var reg = function( title, content ) {
     return $http.post( Const.newsApiPath + '/add', {
         title: title,
         content : content
     } );
   };

   return {
     reg : reg
   };

  } );
