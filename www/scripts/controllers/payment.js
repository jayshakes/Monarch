'use strict';

function ProcessPayment(){
    
    var method = angular.element(document.getElementById('menu-content')).scope().chosenMethod.PaymentType_Name;
    var amount = angular.element(document.getElementById('menu-content')).scope().payValue;
    
    if (method == 'Eftpos'){
        ProcessEftpos(amount, EftposSuccess)
    }
    else{
        angular.element(document.getElementById('menu-content')).scope().confirmPay();
    }
    
}

function EftposSuccess(){
   // alert('Eftpos Finish');
    angular.element(document.getElementById('menu-content')).scope().confirmPay();
}

/**
 * @ngdoc function
 * @name monarchApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the monarchApp
 */
angular.module('monarchApp')
   .controller('PayCtrl', ['$scope','$location', '$mdBottomSheet','$timeout','$mdDialog','$mdToast',  
    function ($scope, $location, $mdBottomSheet, $timeout, $mdDialog, $mdToast) {
   
    // VARIABLES
    $scope.paymentTypes = JSON.parse(localStorage.getItem('PaymentType'));
    $scope.totalPrice = localStorage.getItem('cartAmount'); //Get from database
    $scope.totalBalance = localStorage.getItem('cartAmount'); //Get from database
    $scope.showProgress = false;

    $scope.payValue = 0;
    $scope.amountOwedText = "DUE $"; //Wether Change or amount due

    $scope.init = function() {
        $scope.totalPrice = localStorage.getItem('cartAmount'); //Get from database
        //INITIALISE CART
        if (localStorage.getItem('order')) {
            $scope.cartItems = JSON.parse(localStorage.getItem('order')).cartItems;
        } else {
            $mdToast.showSimple(' No items in the cart');
        };

        //INITIALISE PAST TRANSACTIONS
        if (localStorage.getItem('amountPaid')) {
            $scope.amountPaid = localStorage.getItem('amountPaid');
            $scope.totalPaid();
            $scope.amountOwed();
            $scope.clearPad();
            $scope.balance();
        } else {
            $scope.amountPaid = 0;
            localStorage.getItem('amountPaid', 0);
        };
        

        //set the default payment method by id
        $scope.defaultPayMethod = 1;
        var defaultPayMethods = JSON.parse(localStorage.getItem('PaymentType'));
        $scope.chosenMethod = defaultPayMethods[0];

    }


    //SET PAYMENT METHOD
    $scope.payMethod = function(method){
        $scope.chosenMethod = method;
        $mdToast.showSimple(method.PaymentType_Name +' payment method');
    };
    
    $scope.backBtn = function(type) {
        $location.path('/main');
    };
        
        
        

    $scope.updateAmounts = function(type) {
       $scope.amountPaid = localStorage.getItem('amountPaid');
       $scope.$apply();
    };

    //=========================================================================
    //=========================================================================

    $scope.myRegex = /[a-zA-Z]{4}[0-9]{6,6}[a-zA-Z0-9]{3}/;
    $scope.balance = function() {

        if (localStorage.getItem('amountPaid')) {
            var amountPaid = JSON.parse(localStorage.getItem('amountPaid'));
            $scope.totalBalance =   Math.abs($scope.totalPrice - amountPaid);
        }else{
            $scope.totalBalance = Math.abs($scope.totalBalance);
        };

    };

    $scope.confirmPay = function() {
        // console.log($scope.payValue);
        if ($scope.payValue) {
            $scope.showProgress = true;
            //TODO:
            
            MakePayment($scope.chosenMethod.PaymentType_Name, $scope.payValue, payConfirmed);
        };
    };

   function payConfirmed(response) {

        if (response === "") {
            //PAYMENT WENT THRU           
            $scope.totalPaid();
            $scope.amountOwed();
            $scope.clearPad();
            $scope.balance();

            //CHECK IF ALL PAYED
            var paid = JSON.parse(localStorage.getItem('amountPaid'));
            var cart = JSON.parse(localStorage.getItem('cartAmount'));
            
            if (paid >= cart) {
                console.log("GOT PAID");

                FinalizePayment(clearAll);
                
            }else{
                console.log("PAY ME");
                $scope.showProgress = false;
                $scope.updateAmounts();
            };
            

        }else{
            //PAYMENT DINT GO THRU
            $scope.showProgress = false;
            $mdToast.showSimple(response);
        };
       
    };
        
    function clearAll(){
        $scope.showProgress = false; 
        $scope.showGridBottomSheet();
        OpenCashDraw()
    };
    
        $scope.resetAll = function(){
            localStorage.removeItem("amountPaid");
        localStorage.removeItem("order");
        localStorage.removeItem("cartAmount");
        };



    //=========================================================================
    //Set the amount of transaction paid
    //=========================================================================
    
    $scope.totalPaid = function() {
        var amountReceived = parseFloat($scope.payValue);

        //Check if its in localstorage
        if (localStorage.getItem('amountPaid')) {
            var oldAmount = JSON.parse(localStorage.getItem('amountPaid'));
            amountReceived = oldAmount + amountReceived;
        };

        $scope.amountOwed();
        localStorage.setItem('amountPaid',JSON.stringify(amountReceived));
        $scope.amountPaid = amountReceived;
    };

    //=========================================================================
    //Set the amount of transaction paid
    //=========================================================================
    
    $scope.amountOwed = function() {
        if ($scope.amountPaid > $scope.totalPrice) {
            $scope.amountOwedText = "CHANGE $";
        }else{
            $scope.amountOwedText = "DUE $";
        };
    };
        
                
    //=========================================================================
    //EFTPOS PROCCESSING $scope.showConfirm();
    //=========================================================================  
        
     $scope.showConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('EFTPOS STATE')
            .content('PLEASE SET THE EFTPOS RESULT')
            .ariaLabel('EFTPOS')
            .targetEvent(ev)
            .ok('SUCCESS')
            .cancel('FAILED');
        $mdDialog.show(confirm).then(function() {
            $mdToast.showSimple('YESSSS');
        }, function() {
            $mdToast.showSimple('Report Printed');
        });
    };
        
    

    //=========================================================================
    //PRINT RECEIPT
    //=========================================================================
    $scope.printReceipt = function() {

    };

    //=========================================================================
    //GET CUSTOMER INFO
    //=========================================================================
    $scope.customerInfo = function() {
        $mdBottomSheet.hide(); 
        $location.url("/customerInfo"); 
        
    };

    //=========================================================================
    //FINALISE TRANSACTION CLEAR ALL
    //=========================================================================
    $scope.finishAll = function() { 
        $mdBottomSheet.hide(); 
        $location.url("/main");  
    };
    


    //=========================================================================
    //=========================================================================
    $scope.clearPad = function(){
        $scope.totalBalance = 0; //Get from database
        $scope.payValue = 0;
        $scope.balance(0);
        $scope.listenedString = 0;
    };
        
    //=========================================================================
    //Reset transaction paid
    //=========================================================================
    
    $scope.cancelPay = function() {
       $scope.listenedString = "";
        $scope.payValue = 0;
    };
        
        

    //=========================================================================
    //=========================================================================
    //=========================================================================
    //=========================================================================
    $scope.init();
    //=========================================================================
    //=========================================================================
    //=========================================================================
    //=========================================================================




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
    $scope.toggleKeypadPosition =  function(){
        var params = {
            position:{
                x:0,
                y:0
            }
        };
        //Toggling KeyPad Locking state, second argument is Keypad ID, third is the param object.
        $scope.$emit(Keypad.TOGGLE_OPENING, "numeric",params);
    }
    /**
     * This example show how to listen for the KEY_PRESSED event thrown
     * by the keypad and do what you need to do with it.
     */  
    $scope.listenedString = 0;
    $scope.$on(Keypad.KEY_PRESSED, function(event,data){
        if ($scope.chosenMethod != null) {
            
            if (data.indexOf("$") >= 0) {
                data = Number(data.substr(1));
                var doubleValue = Number($scope.payValue) + Number(data);

                $scope.payValue = doubleValue;
                $scope.$digest();
                return;
            }

            $scope.listenedString += data;

            var newValue = parseFloat($scope.listenedString).toFixed(3);
            newValue = Number(newValue);
            $scope.payValue = newValue;
            $scope.$digest();
        }else{
            $mdToast.showSimple('Please pick a payment method');
        };      
    });

    $scope.showGridBottomSheet = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'bottom-sheet',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false
        }).then(function(answer) {
            if(answer == 'email'){
                $scope.customerInfo();
                $scope.resetAll();
                return;
            };
            if(answer == 'finish' || answer == 'print'){
                $scope.finishAll();
                $scope.resetAll();
                return;
            };  
        });
    };
}]);

function DialogController($scope, $mdDialog) {
    if(localStorage.getItem('cartAmount') && localStorage.getItem('amountPaid')){
        var total = parseInt(localStorage.getItem('cartAmount'));
        var paid = parseInt(localStorage.getItem('amountPaid'));
        $scope.totalBalance =  Math.abs(total - paid).toFixed(2);
    }

    $scope.hide = function(answer) {
        $mdDialog.hide(answer);
    };
}





