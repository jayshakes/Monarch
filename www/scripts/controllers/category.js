'use strict';

/**
 * @ngdoc function
 * @name monarchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the monarchApp
 */
 
angular.module('monarchApp')
  .controller('CategoryCtrl', ['$scope','myService','$mdToast',function ($scope,myService,$mdToast ) {
    $scope.openToast = function($event) {
    $mdToast.show($mdToast.simple().content('Hello!'));
    // Could also do $mdToast.showSimple('Hello');
  };



  var imagePath = 'img/steak.jpg';
  $scope.todos = [];
  for (var i = 0; i < 15; i++) {
    $scope.todos.push({
      face: imagePath,
      what: "Brunch this weekend?",
      who: "Min Li Chan",
      notes: "I'll be in your neighborhood doing errands."
    });
  }


  
  	$scope.cart = []
    $scope.products = [
    {"id": 100}, 
    {"id": 200}, 
    {"id": 454}, 
    {"id": 452}, 
    {"id": 22}, 
    {"id": 22}, 
    {"id": 22789}, 
    {"id": 22}, 
    {"id": 89}, 
    {"id": 454}, 
    {"id": 452}, 
    {"id": 22}, 
    {"id": 22}];

    $scope.prodList = function(a) {
    	//alert('sss');

    	switch(a) {
		    case 1:
		        console.log(a);
		        $scope.products = [
			    {"id": 100}]
		        break;
		    case 2:
		        console.log(a);
		        $scope.products = [
			    {"id": 200}]
		        break;
		    case 3:
		        console.log(a);
		        $scope.products = [
			    {"id": 300}]
		        break;
		    default:
		        console.log(a);
		}
	}
	
	// ADD TO CART
	//===================================

	$scope.addToCart = function(product){
		console.log(product);
	}



$scope.callFoo = function() {
            myService.foo();
        }
}]);

