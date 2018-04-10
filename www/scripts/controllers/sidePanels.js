'use strict';

/**
 * @ngdoc function
 * @name monarchApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the monarchApp
 */
angular.module('monarchApp')
 .controller('LeftCtrl', ['$scope','$location', '$mdBottomSheet','$timeout','$mdDialog','$mdToast', '$mdSidenav', '$log', 
    function ($scope, $location, $mdBottomSheet, $timeout, $mdDialog, $mdToast, $mdSidenav, $log) {
      
        $scope.currentUser = JSON.parse(localStorage.getItem('Staff'));
        $scope.date = new Date();
        
        
        $scope.showModal = false;
        
        
        
        
        
        
        
    $scope.close = function () {
      $mdSidenav('left').close()
    };
      
      
      //CHECK IF APP INITIATED
    if (localStorage.getItem('menuItems')) {
        $location.url("#/masterLogin");
    };

    //NAVIGATE AROUND
    $scope.menuNav = function(nav){
         $scope.showModal = true;
        console.log(nav.location);$scope.close();  
        $location.url("/"+nav.location);
        
    };


    //LOGOUT OF APP
    $scope.logout = function(){
        $scope.showModal = true;
        $mdSidenav('left').close();
        $location.url("/login");
        //CALL BACKGROUND FUNCTION 
        
    };

    //CLOSE MENU CALLBACK
    $scope.exit = function(){ 
        $mdSidenav('left').close();
        $location.url("/login");
    };

    //FORCE CLOSE MENU
    $scope.mainMenuClose = function(){
       $("#mainMenuClose").click();
    };

    $scope.menuItems = [
    {
    "id": "1",
    "Name": "Home", 
    "icon": "&#xE88A;",
    "location": "main",
    "active": true
    },{
    "id": "1",
    "Name": "Settings",
    "icon": "&#xE8D1;", 
    "location": "inventory",
    "active": true
    },{
    "id": "2",
    "Name": "Reports",
    "icon": "&#xE01D;",
    "location": "reports",
    "active": true
    },{
    "id": "8",
    "Name": "Logout",
    "icon": "&#xE8AC;",
    "location": "login",
    "active": true
    },{
    "id": "3",
    "Name": "Hospitality",
    "icon": "&#xE561;",
    "location": "hospitality",
    "active": false
    },{
    "id": "4",
    "Name": "Edit store",
    "icon": "&#xE40A;", 
    "location": "editStore",
    "active": false
    },{
    "id": "5",
    "Name": "Upload/Sync",
    "icon": "&#xE2BF;",
    "active": false
    },{
    "id": "6",
    "Name": "Payment",
    "icon": "&#xE227;",
    "location": "payment",
    "active": true
    }
    ];
}]);
