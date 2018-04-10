'use strict';

/**
 * @ngdoc function
 * @name monarchApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the monarchApp
 */
angular.module('monarchApp')
   .controller('MenuCtrl', ['$scope','$location', '$mdBottomSheet','$timeout','$mdDialog','$mdToast',  
    function ($scope, $location, $mdBottomSheet, $timeout, $mdDialog, $mdToast) {

    //CHECK IF APP INITIATED
    if (localStorage.getItem('menuItems')) {
        $location.url("/masterLogin");
    };

    //NAVIGATE AROUND
    $scope.menuNav = function(nav){
        $location.url("/"+nav.location);
        $scope.mainMenuClose();    
    };


    //LOGOUT OF APP
    $scope.logout = function(){
        
        //CALL BACKGROUND FUNCTION 
        
    };

    //CLOSE MENU CALLBACK
    $scope.exit = function(){
        $location.url("/login");
        $scope.mainMenuClose();
    };


    $scope.menuItems = [
    {
    "id": "1",
    "Name": "Home",
    "icon": "store",
    "location": "main",
    "active": true
    },{
    "id": "1",
    "Name": "Inventory",
    "icon": "store",
    "location": "inventory",
    "active": true
    },{
    "id": "2",
    "Name": "Reports",
    "icon": "equalizer",
    "location": "reports",
    "active": true
    },{
    "id": "7",
    "Name": "Exit",
    "icon": "equalizer",
    "location": "login",
    "active": true
    },{
    "id": "3",
    "Name": "Hospitality",
    "icon": "restaurant_menu",
    "location": "hospitality",
    "active": false
    },{
    "id": "4",
    "Name": "Edit store",
    "icon": "palette",
    "location": "editStore",
    "active": false
    },{
    "id": "5",
    "Name": "Upload/Sync",
    "icon": "cloud_done",
    "location": "sync",
    "active": false
    },{
    "id": "6",
    "Name": "Payment",
    "icon": "attach_money",
    "location": "payment",
    "active": true
    }
    ];




   
}]);
