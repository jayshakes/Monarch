'use strict';

/**
 * @ngdoc function
 * @name monarchApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the monarchApp
 */
angular.module('monarchApp')
   .controller('MasterLoginCtrl', ['$scope','$location', 'myProducts','$timeout', '$mdSidenav', '$mdUtil', '$log', 
    function ($scope, $location, myProducts, $timeout, $mdSidenav, $mdUtil, $log) {

    $('.menu-btn').hide();
    $scope.password = null;

   $scope.submit = function(form) {
        // Trigger validation flag.
        // If form is invalid, return and let AngularJS show validation errors.
        if (form.$invalid) {
          return;
        }        

        var user = form.user.$viewValue;
        var password = form.password.$viewValue;

        console.log(user + password);

        //map to database function 
        //TODO MAP TO DATABASE
        localStorage.setItem("APP_KEY","123045123")
        $timeout(function(){  $location.url("/main"); });      
    };


    
    function LoginCallBack(blogin){
        console.log('submitted3');
        if (blogin){
            var staff = JSON.parse(localStorage.getItem('Staff'));
            getAllFunctionbyRole(staff.Role_ID);
            $timeout(function(){  $location.url("/main"); });
        }
        else
        {
            alert('Login Failed');
            $scope.listenedString = "";
            $scope.password = null;

        }
    }


    $scope.submitPad = function(form){
     $timeout(function(){ $('#formSubmit').click(); });      
    };

    

     $scope.clearPad = function(){
     $scope.password = null;
     $scope.listenedString = "";
      
    };

    var self = this;
    var selectedInputIndex = 0;

    /**
     * This example show how to toggle locked/unlocked
     * state of the keypad.
     */  
    $scope.toggleKeypadLock =  function(){
        //toggleLock();
        //Toggling KeyPad Locking state, second argument is Keypad ID
        $scope.$emit(Keypad.TOGGLE_LOCKING, "numeric");
    }

    /**
     * This example show how to toggle open/close
     * state of the keypad.
     */  
    $scope.toggleKeypadOpening =  function(){
        //Toggling KeyPad Locking state, second argument is Keypad ID
        $scope.$emit(Keypad.TOGGLE_OPENING, "numeric");
    }

    /**
     * This example show how to listen for the KEY_PRESSED event thrown
     * by the keypad and do what you need to do with it.
     */
    $scope.keyPress = function(data){
        $scope.listenedString += data;
        $scope.password = $scope.listenedString;
    };
   
    $scope.listenedString = "";
    $scope.$on(Keypad.KEY_PRESSED, function(event,data){
        $scope.listenedString += data;
        $scope.password = $scope.listenedString;
        $scope.$digest();
    });



}]);
