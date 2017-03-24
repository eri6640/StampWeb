var app = angular.module( 'COREAPI', [] );
app.controller( 'StampsAddController', function( $scope, $http, $window ,AddService) {

	$scope.test = 'testejam';

	$scope.errorData = {
		error : false,
		message : 'error?'
	};

  $scope.save = function(Redirect){

    var name = $scope.name;
    var description = $scope.description;
    var year = $scope.year;
    var picture = $scope.picture;

    if( angular.isEmpty(name) ){
      $scope.errorData.error = true;
      $scope.errorData.message = 'name cannot be empty!';
    }
    else if( angular.isTooShort(name, 3) ){
      $scope.errorData.error = true;
      $scope.errorData.message = 'name too short!';
    }
    else if( angular.isEmpty(description) ){
      $scope.errorData.error = true;
      $scope.errorData.message = 'description cannot be empty!';
    }
    else if( angular.isTooShort(description, 3) ){
      $scope.errorData.error = true;
      $scope.errorData.message = 'description too short!';
    }
    else if( angular.isEmpty(year) ){
      $scope.errorData.error = true;
      $scope.errorData.message = 'year cannot be empty!';
    }
    else if( angular.isTooShort(year, 3) ){
      $scope.errorData.error = true;
      $scope.errorData.message = 'year too short!';
    }
    else if( angular.isEmpty(picture) ){
      $scope.errorData.error = true;
      $scope.errorData.message = 'description cannot be empty!';
    }
    else if( angular.isTooShort(picture, 3) ){
      $scope.errorData.error = true;
      $scope.errorData.message = 'description too short!';
    }
    else if (!angular.isNumber(year)){
			$scope.errorData.error = true;
			$scope.errorData.message = 'year is not true!';
    }
		else if( year < 1840 ){
			$scope.errorData.error = true;
			$scope.errorData.message = 'year is not true 2!';
		}
    else{
		console.log('else ');

      var res = AddService.save( name, description, year, picture );
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

   var save = function( name, description, year, picture) {
     return $http.post( Const.stampsApiPath + '/add', {
         name: name,
         description: description,
         year: year - 0,
         picture: picture
     } );
   };

   return {
     save : save
   };

  } );
