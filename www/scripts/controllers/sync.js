'use strict';

/**
 * @ngdoc function
 * @name monarchApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the monarchApp
 */
angular.module('monarchApp')
   .controller('SyncCtrl', ['$scope','$http','$location', '$mdBottomSheet','$timeout','$mdDialog','$mdToast',  
    function ($scope, $http, $location, $mdBottomSheet, $timeout, $mdDialog, $mdToast) {

    $scope.modalShown = true;
    

    //CHECK IF APP INITIATED
    if (localStorage.getItem('menuItems')) {
        $location.url("/masterLogin");
    };

    // MAP THIS TO DATABASE UPLOAD FUNCTION
    $scope.syncData = function(){
      //$http.get("http://www.w3schools.com/angular/customers.php")
      $http.get("https://en.wikipedia.org/wiki/Dash_Snow")
      .success(function (data, status, headers, config) {
          $scope.names = data;
          $scope.synced();
      }).error(function (data, status, headers, config) {
          $scope.refreshModal = true;
          $mdToast.showSimple("Sorry the upload faild");
          $scope.modalShown = false;
      });
    };
    $scope.syncData();

  // GO BACK
  $scope.synced = function(){
    $mdToast.showSimple("Data synced :)");
          //$scope.modalShown = false;
          $timeout(function() {
            //$location.url("/main");
          }, 3000);
  };

  // GO BACK
  $scope.back = function(){
    $location.url("/main");
  };  
}]);
