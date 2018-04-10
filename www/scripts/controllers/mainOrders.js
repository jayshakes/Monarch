'use strict';

/**
 * @ngdoc function
 * @name monarchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the monarchApp
 */

angular.module('monarchApp')
  .controller('OrdersCtrl', ['$scope','ordersService', '$mdToast','$timeout', '$mdSidenav', '$mdUtil', '$log', '$location', 
  	function ($scope, ordersService, $mdToast, $timeout, $mdSidenav, $mdUtil, $log, $location) {
   
    
    console.log(ordersService.getProducts());



      
    //====================================================================================
    // INITIALISE THE ITEMS  
    //====================================================================================
   

	
}]);