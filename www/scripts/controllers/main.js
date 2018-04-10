'use strict';

/**
 * @ngdoc function
 * @name monarchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the monarchApp
 */

function ScanBarcode(){ 
    
     try{
      cordova.plugins.barcodeScanner.scan(
      function (result) {
         // alert("We got a barcode\n" +
         //       "Result: " + result.text + "\n" +
         //       "Format: " + result.format + "\n" +
         //       "Cancelled: " + result.cancelled);
         // alert(result.text);
          navigator.notification.beep(1);
          
        try{
            var barcode = result.text;
            alert(barcode);
            getItembyBarcode(barcode, ScanCallBack);
            
          
        }
        catch(er){
           alert(er);
        }
         
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
              
   );   
          }
          catch(err){
              alert(err);
          }

    
          
 }

function ScanCallBack(result){
     
    alert(result.rows.length);
     if (result.rows.length > 0){
     var json = {};
      json["id"] = result.rows.item(i).Item_ID;
      json["Name"] = result.rows.item(i).Item_Name;
      json["Amount"] = result.rows.item(i).Amount;
      json["selected"] = false;
     
     var currentCart = JSON.parse(localStorage.getItem('order'));
		currentCart.push($angular.element(document.getElementById('menu-content')).scope().initProduct(json));
		localStorage.setItem('cartItems',JSON.stringify(currentCart));
		updateTotal();
		angular.element(document.getElementById('menu-content')).scope().update(); //calling angular function outside controller
     }else{
             alert('Barcode not found!');
     }
 } 

angular.module('monarchApp')
  .controller('MainCtrl', ['$scope','ordersService', '$mdToast','$timeout', '$mdSidenav', '$mdUtil', '$log', '$location', 
  	function ($scope, ordersService, $mdToast, $timeout, $mdSidenav, $mdUtil, $log, $location) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    $('.menu-btn').show(); $('#appWindow').removeClass("hide");

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
     
	
    //*************************************************
    $scope.allItemTabs = null;
    $scope.allfunctions = null;
    $scope.allProducts = null;
    $scope.itemCount = 0;
	$scope.totalAmount = 0;
	$scope.optionBox = false;
	$scope.selectedItems = true;
	$scope.itemToEdit = [];
	$scope.functionToEdit = null;
	$scope.itemToEditIndex = null;
	$scope.optionsView = false;
	$scope.optionsViewOpen = false;
	$scope.mainView = 3;
	$scope.cartID = 0;
	//*************************************************

   

    //***** function called in login page (Need time to load the callback) 
   InitilaiseDatabase(InitCallBack); 

  //ReInitilaiseDatabase(InitCallBack);

   

	//***** function called in login page (Need time to load the callback) 
	$scope.openToast = function($event) {
		$mdToast.show($mdToast.simple().content('Hello!'));
		// Could also do $mdToast.showSimple('Hello');
	};

    function InitCallBack(){
        getAllOptions(getOptionSuccess); 
    }
          
	function getOptionSuccess(){
       
		getAllItem();  
		getAllTabItem();
		getPaymentType(LoadPaymentType);    
        GetPending();
        GetItemPrinter()
        getPrinter()
        getEftpos()
        
        
       // GenerateReport("2016-04-28","2016-04-28",null)
	}
      
    //*******function called for payment page ******
      
      function LoadPaymentType(){
        
          /* var paymenttype = JSON.parse(localStorage.getItem('PaymentType'));
         for (var i=0; i <paymenttype.length; i++){
              var TypeName = paymenttype[i].PaymentType_Name;
          }*/
           
          
      }

    //====================================================================================
    // INITIALISE THE MODAL  
    //====================================================================================
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


      
    //====================================================================================
    // INITIALISE THE ITEMS  
    //====================================================================================
    $scope.allProducts = JSON.parse(localStorage.getItem('allProducts'));
    $scope.allfunctions = JSON.parse(localStorage.getItem('Functions'));
    $timeout(function(){ functionsCarousel();});

	
	$scope.initProduct = function(item){ 
        if(!item.Item_Count){item.Item_Count = 1};
        if(!item.Default_Price){item.Default_Price = item.Amount};
		if(item.Item_Selected){item.Item_Selected = ''};
		if(!item.functions){
			item.functions = [ 
			{"id":1,"Name":"Item Price","Amount": item.Amount, "selected": true},
        	{"id":2,"Name":"Quantity","Amount": 1, "selected": false},	
            {"id":3,"Name":"Discount","Amount": 0, "selected": false}];
		};
		return item;
	};




	//INITIALISE
	if (localStorage.getItem('allOrders')){
		$scope.allOrders = JSON.parse(localStorage.getItem('allOrders'));
	}else{
		var cart = [];
		localStorage.setItem('allOrders',JSON.stringify(cart));
		$scope.allOrders = [];
	};



	$scope.loadfunction = function(){ 
         var functions = JSON.parse(localStorage.getItem('Functions'));
         //There doesnt seem to be any database function to get all functions
         $scope.allfunctions = functions;
    }
    $scope.loadfunction();

    $scope.loadtabs = function(){
		var tabs = JSON.parse(localStorage.getItem('allTabs'));
		var allTabs =[];
		if(!tabs)return
		for(var i=0; i<tabs.length; i++){
		 	allTabs.push({'name':tabs[i].Tab_Name,'id':tabs[i].Tab_ID});
		 	$scope.allItemTabs = allTabs;
		}  
    }

    $scope.loadtabs();

	// Sets the secondary product views
    $scope.prodList = function(a) {        
        if (a === 0) {
        	$scope.allProducts = JSON.parse(localStorage.getItem('allProducts'));
        } else{
			$scope.allProducts = JSON.parse(localStorage.getItem('allProducts'));
			var itemtabs = JSON.parse(localStorage.getItem('allItemTabs'));
			var list = []; 
			for (var i=0; i< $scope.allProducts.length; i++){
			 	var tabid = itemtabs[i].Tab_ID;
			 	if (a === $scope.allProducts[i].SubCategory_ID){
			     	list.push($scope.allProducts[i]);
			 	}
			}
			$scope.allProducts = list;
		};
	}

	$scope.resetProducts = function(a) {        
        $scope.allProducts = JSON.parse(localStorage.getItem('allProducts'));
	}

	// UPDATE CART
	//===================================
	$scope.update = function(){
		if(JSON.parse(localStorage.getItem('order'))){
			$scope.cartItems = JSON.parse(localStorage.getItem('order')).cartItems;
		}
	};
    
	// ADD TO CART
	//===================================
	var updateTotal = function() {
		var total = 0;
		if(JSON.parse(localStorage.getItem('order'))){
			var items = JSON.parse(localStorage.getItem('order')).cartItems;
		    for (var i=0; i<items.length; i++){
		    	total += parseFloat(items[i].Amount);
		    }
			$scope.itemCount = items.length;
			$scope.totalAmount = total;

			$('#pay-total').html((total).toFixed(2));
			$('#pay-title').html('('+items.length+')');
			localStorage.setItem('cartAmount',(total).toFixed(2));
			$scope.update();
		}else{
			$('#pay-total').html('0.00');
			$('#pay-title').html('0');
		}
		
	};
    updateTotal();

	
	// ADD TO CART
	//===================================
	$scope.addToCart = function(product) {
		
		var theItem = product;
		if(product.originalObject){
			theItem = product.originalObject;
		}else{
			$(".c-item").removeClass("selected");
		}

		var currentCart = JSON.parse(localStorage.getItem('order'));
		if(!currentCart || currentCart.length == 0){
			currentCart = {
				OrderName:"",
				TableNumber: "",
				OrderInfo: "",
				OrderAmount:0,
				cartItems: []
			}
		}
		currentCart.cartItems.push($scope.initProduct(theItem));
		localStorage.setItem('order',JSON.stringify(currentCart));
		updateTotal();
		$scope.update();
	};

	$scope.resetCart = function() {
		$scope.cartItems = null;
		$scope.Amount = 0;
		localStorage.removeItem('order');
		localStorage.removeItem('cartAmount');
		updateTotal();
		
	}


	$scope.selectCartItem = function(item,index){

		for (var i = 0; i < $scope.cartItems.length; i++) {
			//if ($scope.cartItems[i].Item_Name != item.Item_Name) {
            if (i !== index){
				$scope.cartItems[i].Item_Selected = " ";
				for (var v = 0; v < $scope.cartItems[i].functions.length; v++) {
					$scope.cartItems[i].functions[v].selected = false;
				};
			};
		};
        
		// Toggle on /off
		item.Item_Selected  = item.Item_Selected  == "selected" ? " " : "selected";
		$scope.functionToEdit = null;
		$scope.radio = null;

		if($scope.itemToEdit){
			console.log("SELECT OFF");
			$scope.itemToEdit = null;
		}else{
			console.log("SELECT ON");
		}
		
		if(item.Options && item.Options.length > 0){
			$scope.setSelectCartItemDetails(item);
			$scope.optionsViewOpen = true;
		}else{
			$scope.optionsViewOpen = false;
		}
		
		if(item.Item_Selected == "selected"){
			$scope.optionBox = true;
			$scope.mainView = 2;
			$scope.itemToEdit = item;
			$scope.itemToEditIndex = index;
			
		}else{
			$scope.optionBox = false;
			$scope.mainView = 3;
			for (var i = 0; i < item.functions.length; i++) {
				item.functions[i].selected = false;
			};
		}

		var currentCart = JSON.parse(localStorage.getItem('order'));
		currentCart.cartItems = $scope.cartItems;
		localStorage.setItem('order',JSON.stringify(currentCart));
	};




	// REMOVE FROM CART
	//===================================
	$scope.removefromCart = function(product,id) {
		$scope.cartItems.splice(id,1); 
		if ($scope.itemToEdit = product) {
			$scope.closeEdit();
		};

		//if cart empty close editpane
		if ($scope.cartItems.length == 0) {
			$scope.closeEdit();
		};
		var currentCart = JSON.parse(localStorage.getItem('order'));
		currentCart.cartItems = $scope.cartItems;
		localStorage.setItem('order',JSON.stringify(currentCart));
		updateTotal();
	};



	$scope.allItems = function() {
	    myProducts.allItems();
	}

	$scope.callFoo = function() {
	    myService.foo();
	}


//=============================================================================================================================
//=============================================================================================================================
    $scope.payment = function(){
    	$location.url("/payment");		
    };


    $scope.optionsViewSwitch  = function(state){
    	console.log($scope.optionsView);
    
    	if(state){
			$scope.optionsViewOpen = false;
    	}else{
    		$scope.optionsViewOpen = true;
    	}

    };

    
   
//SAMPLE FUNCTION FOR EDITING
//=============================================================================================================================
//=============================================================================================================================
	
	// SETUP CART OPTIONS

	$scope.setSelectCartItemDetails = function(item) {

		$scope.selectedItemOptions = [];

		for (var i = 0; i < item.Options.length; i++) {
			
			for (var n = 0; n < item.Options[i].length; n++) {
				 console.log(item.Options[i]);
			}
			$scope.selectedItemOptions.push(item.Options[i]);
		};


	};

	//PRODUCT EDITING
	$scope.editOptionsSubmit = function(item){
		console.log($scope.selectedItemOptions);
		console.log(item);
	};

	
	$scope.singleOptionSelect = function(option, id){
		var index = $scope.selectedItemOptions.indexOf(option);
		for (var i = 0; i <  $scope.selectedItemOptions[index].Options.length; i++) {
			var current =  $scope.selectedItemOptions[index].Options[i];
			if(id == i){
				current.state = true;
			}else{
				current.state = false;
			}
		}
	};

	//PRODUCT EDITING
	$scope.calculateMulti = function(id, price, state, index){

		console.log(id);
		console.log(price);
		console.log(state);
		var cost = null;

		for (var i = 0; i < $scope.selectedItemOptions.length; i++) {
			if($scope.selectedItemOptions[i].Id === id){
				console.log($scope.selectedItemOptions[i]);
				for (var v = 0; v < $scope.selectedItemOptions[i].Options.length; v++) {
					if(v == index){
						var opt = $scope.selectedItemOptions[i].Options[v];
					console.log(opt.amount);
					console.log(opt);
					}
					
				}
				if(state){
					$scope.selectedItemOptions[i].Cost += opt.amount;
				}else{
					$scope.selectedItemOptions[i].Cost -= opt.amount;
					if($scope.selectedItemOptions[i].Cost < 0){
						$scope.selectedItemOptions[i].Cost = 0;
					}
				}	
			}
		};
	};

	$scope.addDiscountFunction = function(option){
		//the option being changed 
		var discountAvailable = false;
		for (var i = 0; i < $scope.itemToEdit.functions.length; i++) {
			if ($scope.itemToEdit.functions[i].Name == 'Discount') {
				$mdToast.showSimple('Discount function available');
				discountAvailable = true;
			}
		};
			//Discount_p
			//Discount_b

		if (!discountAvailable) {
			$scope.itemToEdit.functions.push({"id":3,"Name":"Discount","Amount": 0, "selected": false});
			$scope.cartItems = JSON.parse(localStorage.getItem('order')).cartItems;
			$scope.cartItems[$scope.itemToEditIndex] = $scope.itemToEdit;

			var currentCart = JSON.parse(localStorage.getItem('order'));
				currentCart.cartItems = $scope.cartItems;

			localStorage.setItem('order',JSON.stringify(currentCart));
			$mdToast.showSimple('Add discount function');
		};
			
	};

	$scope.optionEdit = function(option, item){
		//the option being changed 
		//option.selected =  true;

		//Switch of all other functions
		for (var i = 0; i < item.functions.length; i++) {
			if (item.functions[i].Name != option.Name) {
				item.functions[i].selected = false;
			};
		};
		// Toggle on /off
		option.selected  = option.selected  === true ? false : true;
		$scope.functionToEdit = option;
		$scope.listenedString = "";
	};

	$scope.closeEdit = function(){
		//$scope.functionToEdit = null;
		
		//$(".c-item.selected").removeClass("selected");
		for (var i = 0; i < $scope.cartItems.length; i++) {
			$scope.cartItems[i].Item_Selected = " ";
		};
		$scope.mainView = 3;
		$scope.selectedItemOptions = [];
		$scope.functionToEdit = null;
		$scope.optionBox = false;
		$scope.listenedString = ""; 
		$scope.itemToEdit = null;
	};

	$scope.submitEdit = function() {
	    //the option being changed 
	    if ($scope.selectedItems) {
	        console.log($scope.selectedItemOptions);

	  //       //reset the price
	  //       var resetPriceCart = JSON.parse(localStorage.getItem('order'));
	  //       for (var t = 0; t < resetPriceCart.cartItems.length; t++) {
   //  			resetPriceCart.cartItems[t].Amount = resetPriceCart.cartItems[t].Default_Price;			
			// };
			// localStorage.setItem('order',JSON.stringify(resetPriceCart));
			// updateTotal(); 


	        //Quantity
	        if (true) {
	        	console.log('Quantity changed');
	        	$scope.itemToEdit.Item_Count = $scope.itemToEdit.functions[1].Amount;
	        	$scope.UpdateQty($scope.itemToEditIndex,$scope.itemToEdit.functions[1].Amount);
	        };

	        //Price
	        if (true) {
	        	console.log('Price changed');
	        	$scope.itemToEdit.Amount = Number($scope.itemToEdit.functions[0].Amount*parseInt($scope.itemToEdit.functions[1].Amount)).toFixed(2);
	        	$scope.UpdatePrice($scope.itemToEditIndex,$scope.itemToEdit.Amount);
	        };

			//Discount
			if ($scope.itemToEdit.functions[2] && !$scope.itemToEdit.functions[2].Amount == 0){
	        	console.log('Discount changed');
	        	$scope.AddItemDiscount($scope.itemToEdit,$scope.itemToEditIndex,$scope.itemToEdit.functions[2].Amount);
	        };

	        $scope.listenedString = "";
	        for (var v = 0; v < $scope.itemToEdit.functions.length; v++) {
	        	$scope.itemToEdit.functions[v].selected = false;
	        };

	        $scope.closeEdit()

	        $mdToast.showSimple('Saving Edit');

	    };
	};

	//=============================================================================================================================
	//=============================================================================================================================
	 
  	//***************** Newly Added ******
   	$scope.UpdateQty = function(index, newQty){           				 
		var price = $scope.cartItems[index].Amount/$scope.cartItems[index].Item_Count;          
		var amount = price*newQty;

		$scope.cartItems[index].Item_Count = newQty;
		$scope.UpdatePrice(index,amount);

		$scope.cartItems[index].functions[1].Amount = newQty;  
		//localStorage.setItem('cartItems',JSON.stringify($scope.cartItems));

		var currentCart = JSON.parse(localStorage.getItem('order'));
		currentCart.cartItems = $scope.cartItems;

		localStorage.setItem('order',JSON.stringify(currentCart));
		updateTotal(); 
   	}
      
	$scope.UpdatePrice = function(index, newPrice)	{
		var amount = Number(newPrice).toFixed(2);

		//claculate options
        var optionPrice = 0;
    	if($scope.selectedItemOptions){
    		for (var t = 0; t <$scope.selectedItemOptions.length; t++) {
    			optionPrice += parseFloat($scope.selectedItemOptions[t].Cost);			
			};
    	}

    	console.log(optionPrice);

		$scope.cartItems[index].Amount = (Number(amount) + optionPrice).toFixed(2);

		$scope.cartItems[index].Amount = Number($scope.cartItems[index].Amount);


		var currentCart = JSON.parse(localStorage.getItem('order'));
		currentCart.cartItems = $scope.cartItems;

		localStorage.setItem('order',JSON.stringify(currentCart));
		updateTotal();
	}

	$scope.AddItemDiscount = function(object,index, discount){       
		var name = "";
		var amount = 0;
		
		// if (discount.indexOf('%') >= 0){ //its % discount else its $ discount
		// 	name= "-- "+discount+" discount";
		// 	discount = discount.substring(0,discount.indexOf('%'));
		// 	amount = $scope.cartItems[index].Amount * (discount/100)*-1;
		// }else{
		// 	name= "-- $"+discount+" discount";
		// 	amount = discount*-1;
		// }
		//discount.replace('%', '')

		name= "-- "+discount+" discount";
		amount = $scope.cartItems[index].Amount * (discount/100)*-1;

		amount = Number(amount).toFixed(2);
		var positive = Number(amount*-1).toFixed(2);

		//Check if the discount is more than the price
		if ( Number(positive) > Number($scope.cartItems[index].Amount).toFixed(2)) {
			positive = 0;
			$mdToast.showSimple('Discount not allowed');
		};


		$scope.cartItems[index].functions[2].Amount = positive;
		var newPrice = $scope.cartItems[index].Amount - positive;

		console.log(Number(newPrice).toFixed(2));
		
		$scope.cartItems[index].Amount = Number(newPrice).toFixed(2);
$scope.cartItems[index].Amount = Number($scope.cartItems[index].Amount)
		var currentCart = JSON.parse(localStorage.getItem('order'));
		currentCart.cartItems = $scope.cartItems;
		$scope.cartItems[index].functions[2].Amount = Number(discount);
		localStorage.setItem('order',JSON.stringify(currentCart));
		
		updateTotal(); 
	}


	//=============================================================================================================================
    //=============================================================================================================================
    $scope.clearPad = function(){
        $scope.functionToEdit.Amount = 0;
        $scope.listenedString = "";
    };

    var self = this;
    var selectedInputIndex = 0;

    // $scope.$on("[CLEAR]", function(event,data){
    // 	console.log(event);
    // }

    /**
     * This example show how to listen for the KEY_PRESSED event thrown
     * by the keypad and do what you need to do with it.
     */  
    $scope.listenedString = "";
    $scope.$on(Keypad.KEY_PRESSED, function(event,data){
    	console.log("ff");
    	if (true) {};
    	if ($scope.functionToEdit) {
    		$scope.listenedString += data;
        	$scope.functionToEdit.Amount = Number($scope.listenedString);
        	$scope.$digest();
    	}else{
    		$mdToast.showSimple('Please select an option');
    	};
    });
          
	//----------------Barcode Scanning-------------------
	$scope.scanBarcode = function(){
	                   
	    
	}
          

	//=============================================================================================================================
	// ORDERS 
	//=============================================================================================================================
	
	$scope.showOrders = function(){
        $scope.mainView == 1 ? $scope.mainView = 3 :  $scope.mainView = 1; 
        $scope.allOrders = JSON.parse(localStorage.getItem('allOrders'));        
	}

	$scope.showOrder = function(){
	    //if() {}                     
	}

	$scope.editOrder = function(){
		var current = JSON.parse(localStorage.getItem('order'));
		if(current){
			$scope.currentOrder = current;

		}else{
	    	var current = null;
	    	$scope.currentOrder = $scope.selectedOrder;
		}
	    $scope.mainView == 4 ? $scope.mainView = 3 :  $scope.mainView = 4;
	}


	$scope.setOrder = function(){
		DeletePending($scope.selectedOrder.PendingID, orderSetSuccess);
	}

	function orderSetSuccess(info) {
		localStorage.setItem('order',JSON.stringify($scope.selectedOrder));
        $scope.selectedOrder = null;
		$scope.mainView = 3;
		updateTotal(); 
    };

	$scope.setSelectedOrder = function(order, id){
		//$("#orderItems").insertAfter($("#ms"+ id));
		//deletePending(id, callback);
		$scope.selectedOrder = order; 	
	}

	$scope.resetOrder = function(order, id){
		if ($scope.selectedOrder) {
			$scope.selectedOrder = null; 
		}else{
			$scope.mainView = 3; 
		}	
	}

	$scope.tagOrder = function () {
		console.log("tag info");
	}

	

	$scope.saveOrder = function (form) {

		var currentCart = JSON.parse(localStorage.getItem('order'));
		var amount = JSON.parse(localStorage.getItem('cartAmount'));

		if(currentCart && currentCart.cartItems.length > 0 && amount){
	       	if (form) {
	       		if (form.$invalid) return;
	            currentCart.OrderName = form.Name.$viewValue,
				currentCart.TableNumber = form.Table.$viewValue,
				currentCart.OrderInfo = form.Notes.$viewValue;
				currentCart.OrderAmount = amount;
	        }else{
				currentCart.OrderAmount = amount;
	        }
            
            

			currentCart.Order_Amount = localStorage.getItem('cartAmount');
            localStorage.setItem('order',JSON.stringify(currentCart));
			
			//$scope.progressBar("on");
			console.log("CAAALLLAA");
            PrintKitchen();
             var millisecondsToWait = 500;
            setTimeout(function() {
	        $scope.resetCart();
	        ordersService.saveOrder(currentCart);
	        $mdToast.showSimple('Order saved');
	        $scope.resetOrder();
            }, millisecondsToWait);
        

        }else{
        	$mdToast.showSimple('Please add items to the order');
        }
    };


	
	

	//=============================================================================================================================
	//=============================================================================================================================

	function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          },300);
      return debounceFn;
    };

	$scope.close = function () {
	$mdSidenav('right').close()
	  .then(function () {
	    $log.debug("close RIGHT is done");
	  });
	};

	
}]);
