'use strict';

/**
 * @ngdoc function
 * @name monarchApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the monarchApp
 */
angular.module('monarchApp')
   .controller('InventoryCtrl', ['$scope','$location', '$mdBottomSheet','$timeout','$mdDialog','$mdToast',  
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
    $scope.templateList = JSON.parse(localStorage.getItem('allOptions'));

    // INIT



    // AddOption($.Option, $.ItemID, $.CallBack);

    // getOptionTemplate(callbacl) //gets all temolates

    // UpdateOption(option, 0, callback) // item id 0 saves as template

    // UpdateOption(option, ItemID, callback) // item id something



    //itemPrinters Printer settup;

    // item printer

    //id, item id, printer id

    //update item printer(itemlist,printer id, callback);

    //cart items have same id





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

       // getOptionTemplate(setAllTemplates);
        getAllStaff(setAllStaff);

        //INITIALISE TABS
        if (localStorage.getItem('allTabs')) {
            $scope.allTabs = JSON.parse(localStorage.getItem('allTabs'));
        } else {
            $mdToast.showSimple(' No categories yet');
        };

        $scope.currentItemDetailList = [];

        //INITIALISE DEFAULT VIEW
        $scope.sectionView = "product";
        var defaultPayMethods = JSON.parse(localStorage.getItem('PaymentType'));
        $scope.chosenView = "product";

        $scope.newItemReset();
        $scope.editItemReset();       
    }


     //SET ALLSTAFF METHOD
    //==================================================================================================================================================
    function setAllStaff(){
        $scope.allStaff = JSON.parse(localStorage.getItem('allStaffs'));
    };setAllStaff();

    
    function setAllTemplates(){
        //$scope.allStaff = JSON.parse(localStorage.getItem('allStaffs'));
    };

    //SET PAYMENT METHOD
    //==================================================================================================================================================
    $scope.currentView = function(view){
        $scope.chosenView = view;
        $mdToast.showSimple('Chosen view ' + $scope.chosenView);
    };
    
    $scope.backBtn = function(type) {
        //$location.path('/main');
        window.history.back();
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
    var images = [
        {"src":"./img/category_img/candy.jpg","Name":"Candy"},
        {"src":"./img/category_img/coffee.jpg","Name":"Coffee"},
        {"src":"./img/category_img/fruit.jpg","Name":"Fruits"},
        {"src":"./img/category_img/veggies.jpg","Name":"Veggies"},
        {"src":"./img/category_img/meals.jpg","Name":"Meals"},
        {"src":"./img/category_img/pastry.jpg","Name":"Pastries"},
        {"src":"./img/category_img/softdrinks.jpg","Name":"Soft Drinks"},
        {"src":"./img/category_img/snacks.jpg","Name":"Snacks"}
    ];
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
            "Tab":form.newItemCategory.$viewValue || 1,
            "Color":form.newItemColor.$viewValue || "",
            "Amount":form.Amount.$viewValue,
            "Current_Stock":form.Current_Stock.$viewValue || 0, //TODO
            "Cost":0, //TODO
            "Barcode":form.Barcode.$viewValue,
            "Notes":form.Notes.$viewValue,
            "Options":form.Options.$viewValue
        };

        if($scope.newItemDetailList){
            newItem.Options = $scope.newItemDetailList;
        }

        console.log(newItem);
        $scope.progressBar("on");
        newItemSuccess()
        //SEND NEW ITEM TO DATABASE
        AddItem(newItem,  newItemSuccess);
    };


    $scope.addCurrentOptionItem = function(chip) {
        if($scope.currentItemDetailList.indexOf(chip) == -1){
          $scope.currentItemDetailList.push(chip);
        }
    }



    //SUCCESS CALLBACK
    //==================================================================================================================================================
   function newItemSuccess() {
        $scope.progressBar("off");
        $scope.newItemReset();
        $scope.init();
        $(".actionBtn").prop('checked', false);
        $mdToast.showSimple('New item saved');
    };

    //REST/CLEAR THE FOR
    //==================================================================================================================================================
    $scope.newItemReset = function() {
        $scope.newItem = {"Item_Name" : "", "Item_Name2" : "", "Amount" : "","Current_Stock":"", "Color" : "", "Img" : "", "Barcode" : "", "Notes" : ""};
        $scope.allTabs.Position = null;
        $scope.createColors.Color = null;
        $scope.currentItemDetailList = [];
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
            "new_Tab" : $scope.itemToEdit.SubCategory_ID,
            "Options" : $scope.currentItemDetailList || []
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
        form.editItemCategory.$viewValue ? form.editItemCategory.$viewValue : form.editItemCategory.$viewValue.Tab_ID = 1; 

        var editedItem = {
            "Item_ID": $scope.itemToEdit.Item_ID,
            "Item_Code":$scope.itemToEdit.Item_Code,
            "Item_Name":form.new_Name.$viewValue,
            "Item_Name2":form.new_Name2.$viewValue,
            "Img":form.editItemImg.$viewValue || "",
            "Current_Stock":$scope.itemToEdit.Current_Stock, //TODO 
            "Cost":0, //TODO
            "Color":form.editItemColor.$viewValue || "",
            "Amount":form.new_Amount.$viewValue,
            "Barcode":form.new_Barcode.$viewValue,
            "Notes":form.new_Notes.$viewValue || "",
            "Tab":form.editItemCategory.$viewValue.Tab_ID || 1
        };

        if($scope.newItemDetailList){
            editedItem.Options = $scope.currentItemDetailList;
        }

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
        $scope.currentItemDetailList = [];
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
        DeleteItem($scope.removedItems, removeItemSuccess);
    };

    function removeItemSuccess(id) {
        $scope.progressBar("off");
        $mdToast.showSimple('Item Removed');
        console.log($scope.removedItems);
        $scope.init();
        $scope.removeItemReset();
        $scope.newItemReset();
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
// DETAILS CONTROL
//==================================================================================================================================================
//==================================================================================================================================================
//==================================================================================================================================================
    $scope.allDetailslist = [];
    $scope.currentList = [];
    $scope.selectedDetailsItem = null;
    $scope.templateDetailslist = [];

    



    //EDIT FORM
    //===================================================================================================================================================
    //===================================================================================================================================================
    $scope.setList  = function(id) {
        $scope.detailslistID = id;
        if(id === 2){
            $scope.currentList = $scope.allDetailslist;
        }else if(id === 1){
            $scope.currentList = $scope.templateDetailslist;
        }
    };


    //CREATE DETAIL BOXES
    //==================================================================================================================================================
    //===================================================================================================================================================
   
    $scope.setSelectedDetails = function(item) {
        console.log(item);
        $scope.selectedDetailsItem = item;
        //$scope.selectedDetailsItem.Item_Details = $scope.opts;
        if ($scope.selectedDetailsItem.Options) {
            for (var i = 0; i < $scope.selectedDetailsItem.Options.length; i++) {
                //$scope.allDetailslist.push($scope.selectedDetailsItem.Options[i]);
                $scope.currentList.push($scope.selectedDetailsItem.Options[i]);
            }
        }
    };

    $scope.addDetailsItem = function(type) {

        if (type === 1) {
            $scope.currentList.unshift({
                "Title": "",
                "Type": 1,
                "Default": null,
                "Cost": 0,
                "Options": []
            });
        } else if (type === 2) {
            $scope.currentList.unshift({
                "Title": "",
                "Type": 2,
                "Default": 0,
                "Cost": 0,
                "Options": []
            });
        } else if (type === 3) {
            $scope.currentList.unshift({
                "Title": "",
                "Type": 3,
                "Default": 0,
                "Min": 0,
                "Max": 10,
                "Step": 1,
                "Unit": 0,
                "Cost": 0,
                "Amount": 1,
                "Count": 0
            });
        }
    };


    $scope.addDetailsBtn = function(item) {
        console.log("add");
        console.log($scope.currentList);
        var index = $scope.currentList.indexOf(item);
        $scope.currentList[index].Options.unshift({
          "name": "",
          "state": false,
          "amount": null
      });     
    };

    $scope.removeDetailsItem = function(item) {
        console.log($scope.currentList);
        var index = $scope.currentList.indexOf(item);
        $scope.currentList.splice(index, 1);     
    };

   
    $scope.removeDetailsBtn = function(itemDetail,detail) {
        var index = $scope.currentList.indexOf(itemDetail);
        var index2 = $scope.currentList[index].Options.indexOf(detail);
        $scope.currentList[index].Options.splice(index2, 1);      
    };

        
    //SEND EDITED ITEM TO DATABASE
    $scope.createDetailsSubmit = function(form) {
        console.log("submitted");
        console.log($scope.currentList);
    
        if($scope.currentList.length == 0)return;    
        for (var i = 0; i < $scope.currentList.length; i++) {
            var detail = $scope.currentList[i];
            if(detail.Type == 1 || detail.Type == 2){
                if(detail.Options.length <= 0 ){
                    var name;
                    detail.Type == 1 ? name = "SINGLE-SELECT (" + (i + 1) + ") button " : name = "MULT-SELECT  (" + (i + 1) + ")";
                    $mdToast.showSimple('Please add a button on ' + name);
                    return;
                }
                if(detail.Title == "" ){
                    var name;
                    detail.Type == 1 ? name = "SINGLE-SELECT (" + (i + 1) + ") button " : name = "MULT-SELECT  (" + (i + 1) + ")";
                    $mdToast.showSimple('Please set the NAME on ' + name);
                    return;
                }else{
                    for (var v = 0; v < detail.Options.length; v++) {
                        console.log(detail.Options[v]);
                        if(detail.Options[v].name == "" || detail.Options[v].amount == null){
                            if(detail.Options[v].name == "" && detail.Type == 1){ $mdToast.showSimple('Please NAME on SINGLE-SELECT ' + (i + 1) + " button " + (v + 1));}
                            if(detail.Options[v].amount == null && detail.Type == 1){ $mdToast.showSimple('Please set the PRICE on SINGLE-SELECT '  + (i + 1) + " button " + (v + 1));}
                            if(detail.Options[v].name == "" && detail.Type == 2){ $mdToast.showSimple('Please set the NAME on MULT-SELECT ' + (i + 1) + " button " + (v + 1));}
                            if(detail.Options[v].amount == null && detail.Type == 2){ $mdToast.showSimple('Please set the PRICE on MULT-SELECT '  + (i + 1) + " button " + (v + 1));}
                            return;
                        }       
                    };
                }
            } 
            if(detail.Type == 3){
                if(detail.Title == "" || detail.Amount == "" || detail.Max == null || detail.Max == 0 || detail.Step == 0){
                    if(detail.Title == ""){ $mdToast.showSimple('Please set the NAME on COUNTER ' + (i + 1));}
                    if(detail.Amount == ""){ $mdToast.showSimple('Please set the PRICE on COUNTER '  + (i + 1));}
                    if(detail.Max == null || detail.Max == 0){ $mdToast.showSimple('Please set the MAXIMUM on COUNTER '  + (i + 1));}
                    if(detail.Step == null || detail.Step == 0){ $mdToast.showSimple('Please set the INCREMENT on COUNTER '  + (i + 1));}
                    return;
                }
            }      
        };


        if(!$scope.selectedDetailsItem){
            //Save template
            getTemplateID(saveNewTemplate);
        }

        if($scope.selectedDetailsItem){
            //Save edited detail
            console.log($scope.selectedDetailsItem);
            UpdateOption($scope.currentList, $scope.selectedDetailsItem.Item_ID,0, addOptionSuccess);
        }  
    };


    function saveNewTemplate(id) {
       AddOption($scope.currentList, 0, id, addOptionSuccess);
    };

    function addOptionSuccess() {
        $scope.progressBar("off");
        $scope.editItemReset();
        $scope.detailsItemReset();
        $scope.init();
        $mdToast.showSimple('Item Saved');
    };

    function editItemSuccess() {
        $scope.progressBar("off");
        $scope.editItemReset();
        $scope.detailsItemReset();
        $scope.init();
        $mdToast.showSimple('Item Saved');
    };

    //REST/CLEAR THE FOR
    //==================================================================================================================================================
    $scope.detailsItemReset = function() {
        $scope.allDetailslist = [];
        $scope.currentList = [];
        $scope.templateDetailslist= [];
        $scope.selectedDetailsItem = null;
    };
    







    //REMOVE FORM
    //===================================================================================================================================================
    //===================================================================================================================================================
    
    












    




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

    //SET PRINTER TO ITEM
    //==================================================================================================================================================  
    
    $scope.currentPrinter = null;


    $scope.setCurrentPrinter = function(printer) {
       $scope.currentPrinter = printer;
       $scope.allPrinterCategoryItems = [];

        if (localStorage.getItem('allProducts')) {
            $scope.allProducts = JSON.parse(localStorage.getItem('allProducts'));
        }

        console.log( $scope.currentPrinter);
        var printerItems = null;
        if (localStorage.getItem('ItemPrinter')) {
            printerItems = JSON.parse(localStorage.getItem('ItemPrinter'));
        }


        for(var i = 0; i < printerItems.length; i++){
            if(printerItems[i].PrinterID ==  $scope.currentPrinter.PrinterID){
                $scope.allPrinterCategoryItems.push(printerItems[i].ItemID);
            }  
        }

        console.log($scope.allPrinterCategoryItems);

    };
   
    $scope.setToPrinterView = function(category) {
        $scope.printerCategoryItems = [];

        if (localStorage.getItem('allProducts')) {
            $scope.allProducts = JSON.parse(localStorage.getItem('allProducts'));
        }

        console.log($scope.allProducts);
        for(var i = 0; i < $scope.allProducts.length; i++){
            if($scope.allProducts[i].SubCategory_ID == category.Tab_ID){
                $scope.printerCategoryItems.push($scope.allProducts[i]);
            }

            for(var v = 0; v < $scope.allPrinterCategoryItems.length; v++){     
             if($scope.allPrinterCategoryItems[v] == $scope.allProducts[i].Item_ID){
                    $scope.allProducts[i].active = true;
                }
            }
        }

        console.log($scope.printerCategoryItems);

    };

    $scope.clearPrinterView = function() {
        $scope.printerCategoryItems = null;
        $scope.allPrinterCategoryItems = [];
    };

    $scope.clearCurrentPrinter = function() {
        $scope.printerCategoryItems = null;
        $scope.allPrinterCategoryItems = [];
        $scope.currentPrinter = null;
    };

    $scope.togglePrinterItem = function(item) {

        if(item.active){
            $scope.allPrinterCategoryItems.push(item.Item_ID);
        }else{
            var index = $scope.allPrinterCategoryItems.indexOf(item.Item_ID);
            $scope.allPrinterCategoryItems.splice(index, 1);
        }

        console.log($scope.allPrinterCategoryItems);
        
    };




    $scope.savePrinterItems = function() {
        console.log($scope.allPrinterCategoryItems);

        //SEND TO DATABASE
        UpdateItemPrinter($scope.allPrinterCategoryItems, $scope.currentPrinter.PrinterID, savePrinterItemsSuccess);
    };

    function savePrinterItemsSuccess() {
        //Check if anything selected
        $scope.clearCurrentPrinter();
        $scope.progressBar("off");
        $mdToast.showSimple('Items saved');
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
            "Password":Number(form.Password.$viewValue),
            "Role_ID":Number(form.newUserRole.$viewValue) || 2
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
            "Password": Number(form.Password.$viewValue),
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
    $scope.addPrinterInfo = [];
    $scope.allEftpos = [{"Eftpos_ID":1, "Eftpos_Name":"Verifone"},{"Eftpos_ID":2, "Eftpos_Name":"Ingenico"},{"Eftpos_ID":3, "Eftpos_Name":"Smartpay"},{"Eftpos_ID":4, "Eftpos_Name":"Wolfstrike"}];
    $scope.EftposSetting = JSON.parse(localStorage.getItem('EftposSettings'));
    $scope.PrinterSetting = JSON.parse(localStorage.getItem('PrinterSetting'));
    $scope.printerType = [{"Name":"Receipt"},{"Name":"Kitchen"}];


        
        
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

    if(!localStorage.getItem('PrinterSetup')){
        localStorage.setItem('allPrinters',JSON.stringify(allPrinters));
    }

    $scope.allPrinters = JSON.parse(localStorage.getItem('PrinterSetup'));

       
        
    $scope.addPrinterSubmit = function(form) {
        console.log(form);
        console.log("SUBMIT");
      //Check if anything selected
        if (!form.$dirty) {
            $mdToast.showSimple('Please edit');
            return
        };
        
        if (form.$invalid) {
            return;
        }
        

        var printer = {
            "PrinterName": form.PrinterName.$viewValue || "", 
            "Type":form.Type.$viewValue || "", 
            "IP": form.IP.$viewValue || "", 
            "Port": form.Port.$viewValue || "",
            "Header": form.Header.$viewValue || "", 
            "SubHeader": form.SubHeader.$viewValue || "",
            "Footer": form.Footer.$viewValue || ""
        };




        $scope.progressBar("on");
        //SEND TO DATABASE
        AddPrinter(printer,addPrinterSuccess);

    };


    function addPrinterSuccess(info) {
        console.log(info);
        //Check if anything selected
        $scope.progressBar("off");
        $mdToast.showSimple('Settings saved');
        $scope.clearAddPrinter();
        $scope.allPrinters = JSON.parse(localStorage.getItem('PrinterSetup'));
    };

    
    $scope.clearAddPrinter = function(form) {
        $scope.addPrinterInfo = [];
    }

    $scope.testPrinterItem = function(item) {

        var index = $scope.allPrinters.indexOf(item);
        $scope.allPrinters.splice(index, 1);

        //updatePrinter(printer, callback);

        localStorage.setItem('allPrinters',JSON.stringify($scope.allPrinters));
    }




    //EFTPOS FORM 
    //======================================================================= 

    $scope.editSelectedPrinter = function(printer) {
        $scope.printerToEdit = printer
    }

    $scope.clearSelectedPrinter = function(printer) {
        $scope.printerToEdit = null;
        $scope.deletePrinterConfirm = null;
    }
    
    $scope.deletePrinter = function(item) {
        if(!$scope.printerToEdit) return;
        //Delete printerToEdit
        $scope.deletePrinterConfirm = true;
    }

    $scope.confirmDeletePrinter = function(item) {
        if(!$scope.printerToEdit) return;
        //Delete printerToEdit
        console.log("CONFIRMED");
        
    }

    function deletePrinterSuccess() {
        //Check if anything selected
        $scope.progressBar("off");
        $scope.deletePrinterConfirm = null;
        $mdToast.showSimple('Settings saved');
    };
    

    $scope.editPrinterSubmit = function(form) {
        console.log(form);
   
        //Check if anything selected
        if (!form.$dirty) {
            $mdToast.showSimple('Please edit');
            return
        };

        if (form.$invalid) {
            return;
        }
        
        var printer = {
            "PrinterName": form.PrinterName.$viewValue, 
            "IP": form.IP.$viewValue, 
            "Port": form.Port.$viewValue, 
            "PrinterID": form.PrinterID.$viewValue,
            "Header": form.Header.$viewValue, 
            "SubHeader": form.SubHeader.$viewValue,
            "Footer": form.Footer.$viewValue
        };

        $scope.progressBar("on");
        //SEND TO DATABASE
        updatePrinter(printer,editPrinterSuccess);

    };


    function editPrinterSuccess() {
        //Check if anything selected
        $scope.progressBar("off");
        $mdToast.showSimple('Settings saved');
        $scope.clearSelectedPrinter();
    };
        


    //EFTPOS FORM 
    //======================================================================= 

    $scope.setEftposSubmit = function(form) {
        console.log(form);
   
        //Check if anything selected
        if (!form.$dirty) {
            $mdToast.showSimple('Please edit');
            return
        };
        
        if (!form.Eftpos.$viewValue) {
            $mdToast.showSimple('Please select eftpos');
        };
        
        var eftpos = {
           "IP": form.IP.$viewValue, 
            "Port": form.Port.$viewValue, 
            "Eftpos": form.Eftpos.$viewValue
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





