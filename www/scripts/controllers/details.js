'use strict';

/**
 * @ngdoc function
 * @name monarchApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the monarchApp
 */
angular.module('monarchApp')
   .controller('DetailsCtrl', ['$scope','$location', '$mdBottomSheet','$timeout','$mdDialog','$mdToast',  
    function ($scope, $location, $mdBottomSheet, $timeout, $mdDialog, $mdToast) {
   
    // VARIABLES
    //==================================================================================================================================================
    $scope.showProgress = false;
    $scope.modalShown = false;
    $scope.allProducts = [];
    $scope.allStaff = [];
    $scope.allTabs = [];
    $scope.itemToEdit = false;
    $scope.roleIDs = [{"Role_ID":1, "Role_Name":"Admin user"},{"Role_ID":2,"Role_Name":"Normal user"}];
    $scope.admin = true; //TODO: Set to null
    $scope.EftposSetting = JSON.parse(localStorage.getItem('EftposSetting'));
    $scope.PrinterSetting = JSON.parse(localStorage.getItem('PrinterSetting'));
    $scope.chosenView = "details";
    // INIT

    //==================================================================================================================================================
    $scope.init = function() {


        //INITIALISE PRODUCTS
        if (localStorage.getItem('allProducts')) {
            $scope.allProducts = JSON.parse(localStorage.getItem('allProducts'));
        } else {
            $mdToast.showSimple(' No products yet');
        };
        
        //INITIALISE TABS
        if (localStorage.getItem('LoggedInUser')) {
            $scope.user = JSON.parse(localStorage.getItem('allTabs'));
            if ($scope.user.Admin) {$scope.admin = true;};
            
        }

        getAllStaff(setAllStaff);

        //INITIALISE TABS
        if (localStorage.getItem('allTabs')) {
            $scope.allTabs = JSON.parse(localStorage.getItem('allTabs'));
        } else {
            $mdToast.showSimple(' No categories yet');
        };

        //INITIALISE DEFAULT VIEW
        $scope.sectionView = "product";
        var defaultPayMethods = JSON.parse(localStorage.getItem('PaymentType'));
        //$scope.chosenView = "product";

        $scope.newItemReset();
        $scope.editItemReset();       
    }


     //SET ALLSTAFF METHOD
    //==================================================================================================================================================
    function setAllStaff(){
        $scope.allStaff = JSON.parse(localStorage.getItem('allStaffs'));
    };setAllStaff();

    //SET PAYMENT METHOD
    //==================================================================================================================================================
    $scope.currentView = function(view){
        $scope.chosenView = view;
        $mdToast.showSimple('Chosen view ' + $scope.chosenView);
    };
    
    $scope.backBtn = function(type) {
        $location.path('/main');
    };

    //SHOW MODALS // PROGRESS
    //==================================================================================================================================================
    $scope.modal = function(state){
        switch(state) {
            case "on":
                if (!$scope.modalShown) {
                    $scope.modalShown = true;
                };
                break;
            case "off":
                if ($scope.modalShown) {
                    $scope.modalShown = false;
                };
                break;
            default:
        }
    };


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
    
      //SET COLORS / IMAGES
    //==================================================================================================================================================
    // SET COLORS
    $scope.colorSet = [{"Color":"red"},{"Color":"blue"},{"Color":"green"},{"Color":"pink"}];
    $scope.createColors = [{"Color":"red"},{"Color":"blue"},{"Color":"green"},{"Color":"pink"}];
    $scope.editColors = [{"Color":"red"},{"Color":"blue"},{"Color":"green"},{"Color":"pink"}];

    // SET COLORS
    var images = [{"src":"./img/yeoman.png","Name":"Steak1"},{"src":"./img/steak.jpg","Name":"Steak2"},{"src":"./img/steak.jpg","Name":"Steak3"},{"src":"./img/steak.jpg","Name":"Steak4"}];
    $scope.createImages = images;
    $scope.editImages = images;
    $scope.imageSet = images;




    //==================================================================================================================================================
    //==================================================================================================================================================
    //==================================================================================================================================================
    // PRODUCT CONTROL
    //==================================================================================================================================================
    //==================================================================================================================================================
    //==================================================================================================================================================


    //SET PRODUCT MODE
    $scope.actionMode = function(mode){
        $scope.actionView = mode;
        $mdToast.showSimple('Chosen view ' + mode );
    };


    //FORM SUBMIT
    //==================================================================================================================================================
   //$scope.newItemImg = "./img/placeholder_thumb.png";
   //$scope.newItemCategory = {"Tab_ID":1,"Tab_Name":"Food","Position":1} ;
        //$scope.newItemColor = "red";
    $scope.newItemSubmit = function(form) {
        
        // Trigger validation flag.
        //$scope.submitted = true;
        console.log(form);
        

        // If form is invalid, return and let AngularJS show validation errors.
        if (form.$invalid) {
            return;
        }

        
        form.newItemColor.$viewValue ? form.newItemColor.$viewValue : form.newItemColor.$viewValue = ""; 
        form.newItemImg.$viewValue ? form.newItemImg.$viewValue : form.newItemImg.$viewValue = ""; 
        form.newItemCategory.$viewValue ? form.newItemCategory.$viewValue : form.newItemCategory.$viewValue = 1; 
        
        
        var newItem = {
            "Item_Name":form.Item_Name.$viewValue,
            "Item_Name2":form.Item_Name2.$viewValue,
            "Img":form.newItemImg.$viewValue,
            "Tab":form.newItemCategory.$viewValue,
            "Color":form.newItemColor.$viewValue,
            "Amount":form.Amount.$viewValue,
            "Current_Stock":form.Current_Stock.$viewValue, //TODO
            "Cost":0, //TODO
            "Barcode":form.Barcode.$viewValue,
            "Notes":form.Notes.$viewValue
        };
        console.log(newItem);
        $scope.progressBar("on");

        //SEND NEW ITEM TO DATABASE
        AddItem(newItem,  newItemSuccess);
    };

    



    //SUCCESS CALLBACK
    //==================================================================================================================================================
   function newItemSuccess() {
       console.log("asd");
        $scope.progressBar("off");
        $scope.newItemReset();
        $scope.init();
        $mdToast.showSimple('New item saved');

    };

    //REST/CLEAR THE FOR
    //==================================================================================================================================================
    $scope.newItemReset = function() {
        $scope.newItem = {"Item_Name" : "", "Item_Name2" : "", "Amount" : "","Current_Stock":"", "Color" : "", "Img" : "", "Barcode" : "", "Notes" : ""};
        $scope.allTabs.Position = null;
        $scope.createColors.Color = null;
        $scope.createSelectedImg = {"src":"./img/placeholder_thumb.png","Name":""};
        $scope.createImages.Name = " ";
    };


    //==================================================================================================================================================
    $scope.createSetImg = function(img) {
        console.log(img);
        $scope.createSelectedImg = img;
    };

    $scope.createSetClr = function(clr) {
        console.log(clr);
        $scope.createSelectedClr = clr;
    };

    $scope.createSetCat = function(cat) {
        console.log(cat);
        $scope.createSelectedCat = cat;
    };

   


    //EDIT FORM
    //==================================================================================================================================================
    //===================================================================================================================================================
    


     $scope.editItemSelected = function(item) {

        $scope.itemToEdit = item;

        $scope.editItemImg =  $scope.itemToEdit.Img;
        $scope.editItemCategory = $scope.itemToEdit.SubCategory_ID;
        $scope.editItemColor = $scope.itemToEdit.Color;
         
        $scope.editItem = {
            "Item_ID": $scope.itemToEdit.Item_ID,
            "Item_Code":$scope.itemToEdit.Item_Code,
            "new_Name" : $scope.itemToEdit.Item_Name , 
            "new_Name2" : $scope.itemToEdit.Item_Name2 , 
            "new_Amount" : $scope.itemToEdit.Amount, 
            "new_Color" : $scope.itemToEdit.Color, 
            "new_Img" : $scope.itemToEdit.Img, 
            "new_Barcode" : $scope.itemToEdit.Barcode, 
            "new_Notes" : $scope.itemToEdit.Comment,
            "new_Tab" : $scope.itemToEdit.SubCategory_ID
        };
        
    };
        
        
        //SEND EDITED ITEM TO DATABASE
    
    $scope.editItemSubmit = function(form) {
        console.log(form);
        // If form is invalid, return and let AngularJS show validation errors.
        if (form.$pristine || form.$invalid) {
            $mdToast.showSimple('Item not valid');
            return;
        }
        
        
        form.editItemColor.$viewValue ? form.editItemColor.$viewValue : form.editItemColor.$viewValue = ""; 
        form.editItemImg.$viewValue ? form.editItemImg.$viewValue : form.editItemImg.$viewValue = ""; 
        form.editItemCategory.$viewValue ? form.editItemCategory.$viewValue : form.editItemCategory.$viewValue = 1; 

        var editedItem = {
            "Item_ID": $scope.itemToEdit.Item_ID,
            "Item_Code":$scope.itemToEdit.Item_Code,
            "Item_Name":form.new_Name.$viewValue,
            "Item_Name2":form.new_Name2.$viewValue,
            "Img":form.editItemImg.$viewValue,
            "Current_Stock":$scope.itemToEdit.Current_Stock, //TODO 
            "Cost":0, //TODO
            "Color":form.editItemColor.$viewValue,
            "Amount":form.new_Amount.$viewValue,
            "Barcode":form.new_Barcode.$viewValue,
            "Notes":form.new_Notes.$viewValue,
            "Tab":form.editItemCategory.$viewValue
        };

        console.log(editedItem);
        $scope.progressBar("on");

        // SEND NEW ITEM TO DATABASE
       UpdateItem(editedItem,editItemSuccess);
    };


    function editItemSuccess() {
        $scope.progressBar("off");
        $scope.editItemReset();
        $scope.init();
        $mdToast.showSimple('Item Saved');
    };


    

    $scope.editItemReset = function() {
        $scope.itemToEdit = null;
        $scope.editItem = null;
    };







    //REMOVE FORM
    //==================================================================================================================================================
    //===================================================================================================================================================
    
    $scope.removeItemSubmit = function(form) {
        //Check if anything selected
        if (!form.$dirty || $scope.removedItems.length == 0) {
            $mdToast.showSimple('Please select an item to delete');
            return
        };
        $scope.progressBar("on");
        console.log($scope.removedItems);
        DeleteItem($scope.removedItems, $scope.removeItemSuccess);
    };

    $scope.removeItemSuccess = function() {
        $scope.progressBar("off");
        $mdToast.showSimple('Item Removed');
        console.log($scope.removedItems);
        $scope.removeItemReset();
    };

    //Reset the form
    $scope.removeItemReset = function() {
        //Reset
        $scope.removedItems = [];
    };

    $scope.removedItems = [];
    //$scope.rchecked = false;
    $scope.removeItemSet = function(item,state) {
        if(this.state.done){
            $scope.removedItems.push(item);
        }else{
            $scope.removedItems.splice(item, 1); 
        };
    };








    




    //==================================================================================================================================================
    //==================================================================================================================================================
    //==================================================================================================================================================
    // CATEGORY CONTROL
    //==================================================================================================================================================
    //==================================================================================================================================================
    //==================================================================================================================================================





    $scope.newTabSubmit = function(form) {
        // Trigger validation flag.
        //$scope.submitted = true;
        console.log(form);
        if (!form.$dirty) {
            $mdToast.showSimple('Please create the category');
            return
        };

        $scope.progressBar("on");
        console.log(form.Tab_Name.$viewValue);

        //SEND NEW ITEM TO DATABASE
        AddSubCategory(form.Tab_Name.$viewValue, newTabSuccess);    
    };


    //INITIALISE THE FORM
    //==================================================================================================================================================
    function newTabSuccess() {
        $scope.progressBar("off");
        $scope.init();
        $mdToast.showSimple('New Category saved');
    };
    
    

    //REST/CLEAR THE FOR
    //==================================================================================================================================================
    $scope.newTab = {"Tab_Name":"","Tab_Position":""};
    $scope.newTabReset = function() {
        $scope.newTab = {"Tab_Name":"","Tab_Position":""};
    };






    //SELECT TAB/CATEGORY TO EDIT
    //==================================================================================================================================================
    $scope.editTabSelected = function(tab) {
        console.log(tab);
        $scope.tabToEdit = tab;
    };


    //FORM SUBMIT FOR EDIT
    //==================================================================================================================================================
    $scope.editTabSubmit = function(form) {
        console.log(form);
         if (!form.$dirty) {
            $mdToast.showSimple('Please edit the category');
            return
        };

        //SEND TO DATABASE
        $scope.progressBar("on");
        UpdateSubCatgeory($scope.tabToEdit.Tab_ID, form.Tab_Name.$viewValue, editTabSuccess);

    };

    function editTabSuccess() {
        $scope.progressBar("off");
        $mdToast.showSimple('Category Saved');
    };

    //RESET EDIT TAB
    //==================================================================================================================================================
    $scope.editTabReset = function(tab) {
        $scope.tabToEdit = null;
    };


    //CHECK IF TAB AVAILABE
    //==================================================================================================================================================    
    $scope.checkTabNum = function(tab) {
        var oldTabs = JSON.parse(localStorage.getItem('allTabs'));
        var exists = false;

        for (var i = 0; i < oldTabs.length; i++) {
            if (oldTabs[i].Position === tab) {
                exists = true;
            };
        };

        if (exists) {
            $scope.tabToEditError = "That number is already filled";
        }else{
            $scope.tabToEditError = null;
        };

        return exists

    };

    $scope.checkTabName = function(name) {
        var oldTabs = JSON.parse(localStorage.getItem('allTabs'));
        var exists = false;

        for (var i = 0; i < oldTabs.length; i++) {
            if (oldTabs[i].Tab_Name === name) {
                exists = true;
            };
        };

        return exists
    };


    


    //REMOVE FORM 
    //==================================================================================================================================================
     $scope.removeTabSubmit = function(form) {
        //Check if anything selected
        if (!form.$dirty || $scope.removedTab.length == 0) {
            $mdToast.showSimple('Please select category to remove');
            return
        };

        //TODO:Send this to database
        console.log($scope.removedTab);

         //SEND TO DATABASE
        $scope.removeTabConfirmForm = true;
        console.log( $scope.removeTabConfirmForm);
    };

    $scope.removeTabConfirm = function() {
        //Check if anything selected
        console.log($scope.removedTab);
        $scope.progressBar("on");

        DeleteSubCategory($scope.removedTab, removeTabSuccess);
    };

    function removeTabSuccess() {
        //Check if anything selected
        $scope.progressBar("off");
        $mdToast.showSimple('Selected category removed');
        $scope.removeTabReset();
        console.log($scope.removedItems);
    };


    //Reset the form
    $scope.removeTabReset = function() {
        //Reset
        $scope.init();
    };

    $scope.removeTabConfirmSwitch = function(){
        if(!$scope.removedTab.length <= 0){
            if ($scope.removeTabConfirmForm){
                $scope.removeTabConfirmForm = false;
            }else{
                $scope.removeTabConfirmForm = true;
            };
        };
        
    };



    $scope.removedTab = [];
    //$scope.rchecked = false;
    $scope.removeTabSet = function(item,state) {
        if(this.state.done){
            $scope.removedTab.push(item);
        }else{
            $scope.removedTab.splice(item, 1); 
        };
    };





    //==================================================================================================================================================
    //==================================================================================================================================================
    //==================================================================================================================================================
    // USER CONTROL
    //==================================================================================================================================================
    //==================================================================================================================================================
    //==================================================================================================================================================

    //console.log(getAllStaff(callback));

    //$scope.allUsers = [{"Staff_ID":1,"Staff_Code":"123456","First_Name":"Admin","Last_Name":"Admin","Role_ID":1,"Price_Level":1}, {"Staff_ID":1,"Staff_Code":"123456","First_Name":"Admin","Last_Name":"Admin","Role_ID":1,"Price_Level":1}, {"Staff_ID":1,"Staff_Code":"","First_Name":"Admin","Last_Name":"Admin","Role_ID":1,"Price_Level":1}]
    //$scope.roleLevels = [{"Level_ID":2, "Level_Name":"Level 1"},{"Level_ID":3,"Level_Name":"Level 2"}];
    //$scope.newUserRole = $scope.roleIDs[0].Role_ID;
        

    //NEW USER CREATE FORM
    //==================================================================================================================================================
    $scope.newUserSubmit = function(form) {
        // Trigger validation flag.
        if (!form.$valid) {
            $mdToast.showSimple('Please select category to remove');
            return
        };

        var newStaff = {
            "First_Name":form.First_Name.$viewValue,
            "Last_Name":form.Last_Name.$viewValue,
            "Staff_Code":"52",//form.Staff_Code.$viewValue,
            "Password":form.Password.$viewValue,
            "Role_ID":form.newUserRole.$viewValue
        };

        console.log(newStaff);

        $scope.progressBar("on");
        //SEND NEW ITEM TO DATABASE
        AddUser(newStaff, createUserSuccess);

    };



        //SUCCESSFUL FORM
    //==================================================================================================================================================
    function createUserSuccess() {
        $scope.progressBar("off");
        $scope.init();
        $mdToast.showSimple('New User saved');
        //getAllStaff(setAllStaff);
        //$timeout(function() {
        //    $scope.setAllStaff();
        //}, 1000);
        $scope.createUserReset();
        
    };




    //REST/CLEAR THE FOR
    //==================================================================================================================================================
    $scope.newUser = {"First_Name":"","Last_Name":"","Staff_Code":"","Password":"","Role_ID":""};
    $scope.createUserReset = function() {
        $scope.newUser = {
            "First_Name":"",
            "Last_Name":"",
            "Staff_Code":"",
            "Password":"",
            "Role_ID":""
        };
        $scope.createRole = null;
    };



    //NO PRICE LEVEL
    $scope.newUserSelected = function(user) {

        $scope.tabToEdit = tab;
        console.log(tab);
        // if (!item.Color || item.Color == "") {
        //     item.Color = "";
        //     $scope.editSelectedClr = {"Color":item.Color};
        // };
      

    };



    //EDIT USER
    //==================================================================================================================================================
    $scope.editUserSubmit = function(form) {
        //Check if anything selected
        var role = null;
        var id_Name = null;
        if (!$scope.editUserRole) {
            role = $scope.userToEdit;
        }else{ 
            role = $scope.editUserRole; 
        };

        //console.log(form);
        var editedUser = $scope.userToEdit;
        editedUser = {
            "First_Name": form.First_Name.$viewValue,
            "Last_Name": form.Last_Name.$viewValue,
            "Password": form.Password.$viewValue,
            "Role_ID": role.Role_ID,
            "Role_Name": role.Role_Name,
            "Staff_ID": $scope.userToEdit.Staff_ID  //TODO find Staff ID
        };

        
        //SEND TO DATABASE
        $scope.progressBar("on");
        UpdateUser(editedUser, editUserSuccess); 
    };

    function editUserSuccess() {
        //Check if anything selected
        $scope.progressBar("off");
        $scope.editUserReset();
        $mdToast.showSimple('User saved');
        console.log($scope.editdUser);
    };

    //Reset the form
    $scope.editUserReset = function() {
        $scope.userToEdit = null;
        $scope.editUserRole = [];
    };

    //Reset the form
    $scope.editSetUserRole = function(role) {
        $scope.editUserRole = role;
    };

    //$scope.userToEdit = [];
    //$scope.rchecked = false;
    $scope.userSelectedToEdit = function(user) {
        $scope.userToEdit = user;        
    };




    //REMOVE FORM 
    //==================================================================================================================================================
    $scope.removeUserSubmit = function(form) {
        //Check if anything selected
        if (!form.$dirty || $scope.removedUser.length == 0) {
            $mdToast.showSimple('Please select category to remove');
            return
        };

        //TODO:Send this to database
        console.log($scope.removedUser);

         //SEND TO DATABASE
         $scope.progressBar("on");
         DeleteUser($scope.removedUser, removeUserSuccess);
        
    };

    function removeUserSuccess() {
        //Check if anything selected
        $scope.progressBar("off");
        $mdToast.showSimple('User removed');
        console.log($scope.removedItems);
        $scope.removeUserReset();
    };

   
    //Reset the form
    $scope.removeUserReset = function(form) {
        //Reset
        $scope.removedUser = [];
        $scope.init();
    };


    $scope.removedUser = [];
    //$scope.rchecked = false;
    $scope.removeUserSet = function(user,state) {
        if(this.state.done){
            $scope.removedUser.push(user);
        }else{
            $scope.removedUser.splice(user, 1); 
        };
    };


        
        
        
        
        //==================================================================================================================================================
    //==================================================================================================================================================
    //==================================================================================================================================================
    // SETTINGS CONTROL
    //==================================================================================================================================================
    //==================================================================================================================================================
    //==================================================================================================================================================

        
        
        
    //IP SETTINGS FORM 
    //==================================================================================================================================================
    $scope.setSytemSubmit = function(form) {
        //Check if anything selected
        console.log(form);
        if (!form.$dirty) {
            $mdToast.showSimple('Please edit');
            //return
        };

        var settings = {
            "IP":form.ip.$viewValue, 
            "Port":form.port.$viewValue
        };
       
        
        $scope.progressBar("on");
        //SEND TO DATABASE
        
        updatePrinter(settings.IP,settings.Port,setSystemSuccess);

    };

    function setSystemSuccess() {
        //Check if anything selected
        $scope.progressBar("off");
        $mdToast.showSimple('Settings saved');
    };
        
        
        
        
     
    //EFTPOS FORM 
    //==================================================================================================================================================  
    $scope.allEftpos = [{"Eftpos_ID":1, "Eftpos_Name":"Verifone"},{"Eftpos_ID":2, "Eftpos_Name":"Ingenico"},{"Eftpos_ID":3, "Eftpos_Name":"Smartpay"},{"Eftpos_ID":4, "Eftpos_Name":"Wolfstrike"}];
    $scope.EftposSetting = JSON.parse(localStorage.getItem('EftposSetting'));
    $scope.PrinterSetting = JSON.parse(localStorage.getItem('PrinterSetting'));
        
        
        
    $scope.setEftposSubmit = function(form) {
        console.log(form);
   
        //Check if anything selected
        if (!form.$dirty) {
            $mdToast.showSimple('Please edit');
            return
        };
        
        if (! form.eftpos.$viewValue) {
            $mdToast.showSimple('Please set eftpos');
        };
        
        var eftpos = {
           "IP": form.ip.$viewValue, 
            "Port": form.port.$viewValue, 
            "Eftpos": form.eftpos.$viewValue
        };

        $scope.progressBar("on");
        //SEND TO DATABASE
        updateEftpos(eftpos.IP, eftpos.Port, eftpos.Eftpos,setEftposSuccess);

    };


    function setEftposSuccess() {
        //Check if anything selected
        $scope.progressBar("off");
        $mdToast.showSimple('Settings saved');
    };
        
        
        



    //==================================================================================================================================================
    //==================================================================================================================================================
    //==================================================================================================================================================
    //==================================================================================================================================================
    $scope.init();
    //==================================================================================================================================================
    //==================================================================================================================================================
    //==================================================================================================================================================
    //==================================================================================================================================================




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
        $scope.listenedString += parseFloat(data);
        $mdToast.showSimple('Please pick a payment method');
    });

}]);





