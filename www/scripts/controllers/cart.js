'use strict';

/**
 * @ngdoc function
 * @name monarchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the monarchApp
 */
angular.module('monarchApp')
  .controller('CartCtrl', ['$scope','myService','$timeout', '$mdSidenav', '$mdUtil', '$log',function ($scope, myService, $timeout, $mdSidenav, $mdUtil, $log ) {
   	$scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          },300);
      return debounceFn;
    };


	$scope.close = function () {
	$mdSidenav('right').close()
	  .then(function () {
	    $log.debug("close RIGHT is done");
	  });
	};


	

	//$scope.cartItems = JSON.parse(localStorage.getItem('cartItems'));

	
	
// 	// ADD TO CART
// 	//===================================

// 	$scope.addToCart = function(product){
// 		console.log(product);
// 	}



// $scope.callFoo = function() {
//             myService.foo();
//         }









}]);

