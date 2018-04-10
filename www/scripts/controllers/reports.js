/**
 * @ngdoc function
 * @name monarchApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the monarchApp
 */
angular.module('monarchApp')
.controller('ReportsCtrl', ['$scope','$location', '$mdBottomSheet','$timeout','$mdDialog','$mdToast',  
function ($scope, $location, $mdBottomSheet, $timeout, $mdDialog, $mdToast) {

    //==================================================================================================================================================
    //==================================================================================================================================================
    //REPOTR INIT 
    //==================================================================================================================================================
    //==================================================================================================================================================
        $scope.currentReport = "sales"; //SET DEFAULT


  
     $scope.backBtn = function(type) {
        //$location.path('/main');
        window.history.back();
    };

    //==================================================================================================================================================
    //REPOTR FORM 
    //==================================================================================================================================================
    $scope.progressBar = function(state){
        switch(state) {
            case "on":
                if (!$scope.showProgress) {
                    $scope.showProgress = true;
                };
                break;
            case "off":
                if ($scope.showProgress) {
                    $scope.showProgress = false;
                };
                break;
            default:
        }
    };

    //==================================================================================================================================================
    //SET THE REPORT 
    //==================================================================================================================================================

      
    $scope.setReport = function(state){ 
        if(state == "sales"){
            $scope.currentReport = "sales";
        };
        if(state == "item"){
            $scope.currentReport = "item";
        };
        if(state == "category"){
            $scope.currentReport = "category";
        };
        if(state == "transaction"){
            $scope.currentReport = "transaction";
        };
        $scope.generatedReport = null;

    };

    $scope.report = ["sales","item","category","transaction"];




    //==================================================================================================================================================
    //SET THE REPORT 
    //==================================================================================================================================================

    $scope.getReport = function(form) {
        console.log(form);
        //Check if anything selected
        if (!form.$dirty) {
            $mdToast.showSimple('Please edit');
            return
        };


        
        var dates = {
           "start": form.start_Date.$viewValue, 
            "end": form.end_Date.$viewValue
        };

        if($scope.currentReport == "sales"){
            getSalesReport(dates.start, dates.end, reportSystemSuccess); 

        };

        if($scope.currentReport == "items"){
           getItemReport(dates.start, dates.end, reportSystemSuccess); 
        };

        if($scope.currentReport == "category"){
            getCategoryReport(dates.start, dates.end, reportSystemSuccess); 
        };

        if($scope.currentReport == "transaction"){
            getTransactionReport(dates.start, dates.end, transReportSystemSuccess); 
        };

        
        $scope.progressBar("on");
       // alert(dates.start + " " + dates.end);

    };


    function reportSystemSuccess(info) {
        //Check if anything selected
        $scope.progressBar("off");
        $scope.generatedReport = info;
        $mdToast.showSimple('Report Generated');
    };

    function transReportSystemSuccess(info) {
        //Check if anything selected
        $scope.progressBar("off");
        $scope.generatedReport = info;
        // if(info.length > 0){
        //     $scope.setTransView(info[0])
        // }
        console.log($scope.generatedReport);
        $mdToast.showSimple('Report Generated');
    };


    $scope.setTransView = function(item) {
        $scope.transReportView = item.Transaction;
        localStorage.setItem('PrintText',$scope.transReportView);
    };

    $scope.toggleBtn = function(index) {
        console.log(index)
    };


    $scope.generatePrint = function() {
        PrintReport();
    };

    $scope.generateTransPrint = function() {
        //PrintReport();

        //set PrintText into local storage
        console.log("PRINTING TRANS");
    };
    
    $scope.data = {
      group1 : 0,
      group2 : 1,
      group3 : 2
    };
    
    

}]);