'use strict';

/**
 * @ngdoc function
 * @name monarchApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the monarchApp
 */
angular.module('monarchApp')
   .controller('LoginCtrl', ['$scope','$location', 'myProducts','$timeout', '$mdSidenav', '$mdUtil', '$log', '$interval', '$mdToast',
    function ($scope, $location, myProducts, $timeout, $mdSidenav, $mdUtil, $log, $interval, $mdToast) {

    $scope.initialiseAll = function(form) {
        $scope.modalShow = true;
    }

    $('.menu-btn').hide();
    $scope.password = null;

    // //CHECK IF APP INITIATED
    // if (localStorage.getItem('APP_KEY')) {
    //     $location.url("/masterLogin");
    // };

   $scope.submit = function(form) {
        // Trigger validation flag.
        console.log(form);
        if (!form.password.$viewValue) {
          return;
        }
        console.log(form.password.$viewValue);
        var password = form.password.$viewValue;
        //If form is invalid, return and let AngularJS show validation errors.
    

        //map to database function
        ProcessLgin(Number(password),LoginCallBack); 
        $scope.initialiseAll();
          
    };

    
    function LoginCallBack(blogin){
        
        if (blogin){
            var staff = JSON.parse(localStorage.getItem('Staff'));
            getAllFunctionbyRole(staff.Role_ID);
            console.log('PASSED');
            $timeout(function(){  $location.url("/main"); });
        }
        else
        {
            $scope.modalShow = false;
            $mdToast.showSimple('Login Failed');
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
     * This example show how to toggle open/close
     * state of the keypad and set a position at the same time.
     */  
    
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
