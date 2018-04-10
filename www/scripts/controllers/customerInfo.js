'use strict';

/**
 * @ngdoc function
 * @name monarchApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the monarchApp
 */
function Email(){
    
    var toemail = document.getElementById("email").value;
    var name = document.getElementById("name").value;
     
    
    // Trigger validation flag.
	if (true) {
	 	var email = toemail;
	 	var customer = "Hello :)";
	 	if (name) {
	     	customer = name;
	 	}
	 	console.log(email + " "+ customer);
	}
	//FUNCTION TO SEND EMAIL+ CALLBACK
      SendEmail(email, customer, EmailSent);
     
}

function EmailSent()
{
    angular.element(document.getElementById('viewPage')).scope().emailDone();
}

angular.module('monarchApp')
   .controller('CustomerInfoCtrl', ['$scope','$location', '$mdBottomSheet','$timeout','$mdDialog','$mdToast',  
    function ($scope, $location, $mdBottomSheet, $timeout, $mdDialog, $mdToast) {

    $scope.emailSubmit = function(form) {
       
	
 };

   $scope.emailDone = function() {
 	$mdToast.showSimple("Email sent, thank you :)");

 	$timeout(function() {
           $location.path('/main');
    }, 3000);
 };

 $scope.cancel = function() {
 	//$scope.modalShown = true;
 	$location.path('/main');
 };



      
}]).config(function($mdThemingProvider) {
  // Extend the red theme with a few different colors
  $mdThemingProvider.theme('whiteForm')
    .primaryPalette('orange')
});
