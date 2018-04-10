'use strict';

/**
 * @ngdoc overview
 * @name monarchApp
 * @description
 * # monarchApp
 *
 * Main module of the application.
 */
angular.module('monarchApp')
.service('ordersService',[ '$rootScope','$timeout', function($rootScope, $timeout) {

    var orderList = JSON.parse(localStorage.getItem('allOrders'));

    var addOrder = function(newObj) {
        orderList.push(newObj);
    };

    var getOrders = function(){
        return orderList;
    };

    var removeOrder = function(order){
        //DeletePending(pendingid, callback);
        //return true;
    };
    

    var saveOrder = function(order){

        var orders = JSON.parse(localStorage.getItem('allOrders'));

        if(orders){
            var newOrderSet = false;
            for (var i = 0; i < orders.length; i++) {
                if(orders[i].Order_Name == order.Order_Name){
                    newOrderSet = true;
                    orders[i] = order;
                }         
            };

            if(!newOrderSet){
                orders.push(order);
            }
        }else{
            var orders = [];
            orders.push(order)   
        }

        AddPending(order, orderSaved);
        function orderSaved(){
            console.log("saved");
        };

        //localStorage.setItem('allOrders',JSON.stringify(orders));
    
        //send to database
        return true;
    };



    return {
        addOrder: addOrder,
        getOrders: getOrders,
        saveOrder:saveOrder,
        removeOrder:removeOrder
    };
}]);


//[{    "CartID": 1,    "TableNumber": 10,  "cartItems": [{ "Item_ID": 1,   "Item_Code": "6",   "Item_Name": "Kid", "Item_Name2": "",   "SubCategory_ID": 1,    "Current_Stock": 0, "Min_Stock": 0, "Comment": "",  "Img": "",  "Amount": 4,    "Barcode": "198877665546",  "Cost": 1,  "ID": 2,    "Item_Count": 1,    "Default_Price": 4, "functions": [{ "id": 1,    "Name": "Item Price",   "Amount": 4,    "selected": false   }, {    "id": 2,    "Name": "Quantity", "Amount": 1,    "selected": false   }], "Item_Selected": "" }, {    "Item_ID": 4,   "Item_Code": "4",   "Item_Name": "Drink2",  "Item_Name2": "",   "SubCategory_ID": 1,    "Current_Stock": 0, "Min_Stock": 0, "Comment": "",  "Img": "",  "Amount": 1.99, "Barcode": "798877665543",  "Cost": 1,  "ID": 1,    "Item_Count": 1,    "Default_Price": 1.99,  "functions": [{ "id": 1,    "Name": "Item Price",   "Amount": 1.99, "selected": false   }, {    "id": 2,    "Name": "Quantity", "Amount": 1,    "selected": false   }], "Item_Selected": "" }]}, {  "CartID": 2,    "TableNumber": 20,  "cartItems": [{ "Item_ID": 2,   "Item_Code": "6",   "Item_Name": "Kid", "Item_Name2": "",   "SubCategory_ID": 1,    "Current_Stock": 0, "Min_Stock": 0, "Comment": "",  "Img": "",  "Amount": 4,    "Barcode": "198877665546",  "Cost": 1,  "ID": 2,    "Item_Count": 1,    "Default_Price": 4, "functions": [{ "id": 1,    "Name": "Item Price",   "Amount": 4,    "selected": false   }, {    "id": 2,    "Name": "Quantity", "Amount": 1,    "selected": false   }], "Item_Selected": "" }, {    "Item_ID": 4,   "Item_Code": "4",   "Item_Name": "Drink2",  "Item_Name2": "",   "SubCategory_ID": 1,    "Current_Stock": 0, "Min_Stock": 0, "Comment": "",  "Img": "",  "Amount": 1.99, "Barcode": "798877665543",  "Cost": 1,  "$$hashKey": "object:57",   "ID": 1,    "Item_Count": 1,    "Default_Price": 1.99,  "functions": [{ "id": 1,    "Name": "Item Price",   "Amount": 1.99, "selected": false   }, {    "id": 2,    "Name": "Quantity", "Amount": 1,    "selected": false   }], "Item_Selected": "" }]}, {  "CartID": 3,    "TableNumber": 30,  "cartItems": [{ "Item_ID": 3,   "Item_Code": "6",   "Item_Name": "Kid", "Item_Name2": "",   "SubCategory_ID": 1,    "Current_Stock": 0, "Min_Stock": 0, "Comment": "",  "Img": "",  "Amount": 4,    "Barcode": "198877665546",  "Cost": 1,  "ID": 2,    "Item_Count": 1,    "Default_Price": 4, "functions": [{ "id": 1,    "Name": "Item Price",   "Amount": 4,    "selected": false   }, {    "id": 2,    "Name": "Quantity", "Amount": 1,    "selected": false   }], "Item_Selected": "" }, {    "Item_ID": 4,   "Item_Code": "4",   "Item_Name": "Drink2",  "Item_Name2": "",   "SubCategory_ID": 1,    "Current_Stock": 0, "Min_Stock": 0, "Comment": "",  "Img": "",  "Amount": 1.99, "Barcode": "798877665543",  "Cost": 1,  "ID": 1,    "Item_Count": 1,    "Default_Price": 1.99,  "functions": [{ "id": 1,    "Name": "Item Price",   "Amount": 1.99, "selected": false,  "$$hashKey": "object:103"   }, {    "id": 2,    "Name": "Quantity", "Amount": 1,    "selected": false   }], "Item_Selected": "" }]}, {  "CartID": 4,    "TableNumber": 40,  "cartItems": [{ "Item_ID": 4,   "Item_Code": "6",   "Item_Name": "Kid", "Item_Name2": "",   "SubCategory_ID": 1,    "Current_Stock": 0, "Min_Stock": 0, "Comment": "",  "Img": "",  "Amount": 4,    "Barcode": "198877665546",  "Cost": 1,  "ID": 2,    "Item_Count": 1,    "Default_Price": 4, "functions": [{ "id": 1,    "Name": "Item Price",   "Amount": 4,    "selected": false   }, {    "id": 2,    "Name": "Quantity", "Amount": 1,    "selected": false   }], "Item_Selected": "" }, {    "Item_ID": 4,   "Item_Code": "4",   "Item_Name": "Drink2",  "Item_Name2": "",   "SubCategory_ID": 1,    "Current_Stock": 0, "Min_Stock": 0, "Comment": "",  "Img": "",  "Amount": 1.99, "Barcode": "798877665543",  "Cost": 1,  "ID": 1,    "Item_Count": 1,    "Default_Price": 1.99,  "functions": [{ "id": 1,    "Name": "Item Price",   "Amount": 1.99, "selected": false   }, {    "id": 2,    "Name": "Quantity", "Amount": 1,    "selected": false   }], "Item_Selected": "" }]}, {  "CartID": 5,    "TableNumber": 50,  "cartItems": [{ "Item_ID": 5,   "Item_Code": "6",   "Item_Name": "Kid", "Item_Name2": "",   "SubCategory_ID": 1,    "Current_Stock": 0, "Min_Stock": 0, "Comment": "",  "Img": "",  "Amount": 4,    "Barcode": "198877665546",  "Cost": 1,  "ID": 2,    "Item_Count": 1,    "Default_Price": 4, "functions": [{ "id": 1,    "Name": "Item Price",   "Amount": 4,    "selected": false   }, {    "id": 2,    "Name": "Quantity", "Amount": 1,    "selected": false   }], "Item_Selected": "" }, {    "Item_ID": 4,   "Item_Code": "4",   "Item_Name": "Drink2",  "Item_Name2": "",   "SubCategory_ID": 1,    "Current_Stock": 0, "Min_Stock": 0, "Comment": "",  "Img": "",  "Amount": 1.99, "Barcode": "798877665543",  "Cost": 1,  "ID": 1,    "Item_Count": 1,    "Default_Price": 1.99,  "functions": [{ "id": 1,    "Name": "Item Price",   "Amount": 1.99, "selected": false   }, {    "id": 2,    "Name": "Quantity", "Amount": 1,    "selected": false   }], "Item_Selected": "" }]}, {  "CartID": 6,    "TableNumber": 60,  "cartItems": [{ "Item_ID": 6,   "Item_Code": "6",   "Item_Name": "Kid", "Item_Name2": "",   "SubCategory_ID": 1,    "Current_Stock": 0, "Min_Stock": 0, "Comment": "",  "Img": "",  "Amount": 4,    "Barcode": "198877665546",  "Cost": 1,  "ID": 2,    "Item_Count": 1,    "Default_Price": 4, "functions": [{ "id": 1,    "Name": "Item Price",   "Amount": 4,    "selected": false,  "$$hashKey": "object:121"   }, {    "id": 2,    "Name": "Quantity", "Amount": 1,    "selected": false   }], "Item_Selected": "" }, {    "Item_ID": 4,   "Item_Code": "4",   "Item_Name": "Drink2",  "Item_Name2": "",   "SubCategory_ID": 1,    "Current_Stock": 0, "Min_Stock": 0, "Comment": "",  "Img": "",  "Amount": 1.99, "Barcode": "798877665543",  "Cost": 1,  "ID": 1,    "Item_Count": 1,    "Default_Price": 1.99,  "functions": [{ "id": 1,    "Name": "Item Price",   "Amount": 1.99, "selected": false   }, {    "id": 2,    "Name": "Quantity", "Amount": 1,    "selected": false   }], "Item_Selected": "" }]}]


// [{
//     "OrderID": 2015,
//     "OrderName": "Test",
//     "OrderAmount": 200,
//     "TableNumber": 10,
//     "cartItems": [{
//         "Item_ID": 1,
//         "Item_Code": "6",
//         "Item_Name": "Kid",
//         "Item_Name2": "",
//         "SubCategory_ID": 1,
//         "Current_Stock": 0,
//         "Min_Stock": 0,
//         "Comment": "",
//         "Img": "",
//         "Amount": 4,
//         "Barcode": "198877665546",
//         "Cost": 1,
//         "ID": 2,
//         "Item_Count": 1,
//         "Default_Price": 4,
//         "functions": [{
//             "id": 1,
//             "Name": "Item Price",
//             "Amount": 4,
//             "selected": false
//         }, {
//             "id": 2,
//             "Name": "Quantity",
//             "Amount": 1,
//             "selected": false
//         }],
//         "Item_Selected": ""
//     }, {
//         "Item_ID": 4,
//         "Item_Code": "4",
//         "Item_Name": "Drink2",
//         "Item_Name2": "",
//         "SubCategory_ID": 1,
//         "Current_Stock": 0,
//         "Min_Stock": 0,
//         "Comment": "",
//         "Img": "",
//         "Amount": 1.99,
//         "Barcode": "798877665543",
//         "Cost": 1,
//         "ID": 1,
//         "Item_Count": 1,
//         "Default_Price": 1.99,
//         "functions": [{
//             "id": 1,
//             "Name": "Item Price",
//             "Amount": 1.99,
//             "selected": false
//         }, {
//             "id": 2,
//             "Name": "Quantity",
//             "Amount": 1,
//             "selected": false
//         }],
//         "Item_Selected": ""
//     }]
// }, {
//     "OrderID": 218,
//     "OrderName": "Test",
//     "OrderAmount": 200,
//     "TableNumber": 10,
//     "cartItems": [{
//         "Item_ID": 2,
//         "Item_Code": "6",
//         "Item_Name": "Kid",
//         "Item_Name2": "",
//         "SubCategory_ID": 1,
//         "Current_Stock": 0,
//         "Min_Stock": 0,
//         "Comment": "",
//         "Img": "",
//         "Amount": 4,
//         "Barcode": "198877665546",
//         "Cost": 1,
//         "ID": 2,
//         "Item_Count": 1,
//         "Default_Price": 4,
//         "functions": [{
//             "id": 1,
//             "Name": "Item Price",
//             "Amount": 4,
//             "selected": false
//         }, {
//             "id": 2,
//             "Name": "Quantity",
//             "Amount": 1,
//             "selected": false
//         }],
//         "Item_Selected": ""
//     }, {
//         "Item_ID": 4,
//         "Item_Code": "4",
//         "Item_Name": "Drink2",
//         "Item_Name2": "",
//         "SubCategory_ID": 1,
//         "Current_Stock": 0,
//         "Min_Stock": 0,
//         "Comment": "",
//         "Img": "",
//         "Amount": 1.99,
//         "Barcode": "798877665543",
//         "Cost": 1,
//         "$$hashKey": "object:57",
//         "ID": 1,
//         "Item_Count": 1,
//         "Default_Price": 1.99,
//         "functions": [{
//             "id": 1,
//             "Name": "Item Price",
//             "Amount": 1.99,
//             "selected": false
//         }, {
//             "id": 2,
//             "Name": "Quantity",
//             "Amount": 1,
//             "selected": false
//         }],
//         "Item_Selected": ""
//     }]
// }, {
//     "OrderID": 3185,
//     "OrderName": "Test",
//     "OrderAmount": 200,
//     "TableNumber": 10,
//     "cartItems": [{
//         "Item_ID": 3,
//         "Item_Code": "6",
//         "Item_Name": "Kid",
//         "Item_Name2": "",
//         "SubCategory_ID": 1,
//         "Current_Stock": 0,
//         "Min_Stock": 0,
//         "Comment": "",
//         "Img": "",
//         "Amount": 4,
//         "Barcode": "198877665546",
//         "Cost": 1,
//         "ID": 2,
//         "Item_Count": 1,
//         "Default_Price": 4,
//         "functions": [{
//             "id": 1,
//             "Name": "Item Price",
//             "Amount": 4,
//             "selected": false
//         }, {
//             "id": 2,
//             "Name": "Quantity",
//             "Amount": 1,
//             "selected": false
//         }],
//         "Item_Selected": ""
//     }, {
//         "Item_ID": 4,
//         "Item_Code": "4",
//         "Item_Name": "Drink2",
//         "Item_Name2": "",
//         "SubCategory_ID": 1,
//         "Current_Stock": 0,
//         "Min_Stock": 0,
//         "Comment": "",
//         "Img": "",
//         "Amount": 1.99,
//         "Barcode": "798877665543",
//         "Cost": 1,
//         "ID": 1,
//         "Item_Count": 1,
//         "Default_Price": 1.99,
//         "functions": [{
//             "id": 1,
//             "Name": "Item Price",
//             "Amount": 1.99,
//             "selected": false,
//             "$$hashKey": "object:103"
//         }, {
//             "id": 2,
//             "Name": "Quantity",
//             "Amount": 1,
//             "selected": false
//         }],
//         "Item_Selected": ""
//     }]
// }, {
//     "OrderID": 3158,
//     "OrderName": "Test",
//     "OrderAmount": 200,
//     "TableNumber": 10,
//     "cartItems": [{
//         "Item_ID": 4,
//         "Item_Code": "6",
//         "Item_Name": "Kid",
//         "Item_Name2": "",
//         "SubCategory_ID": 1,
//         "Current_Stock": 0,
//         "Min_Stock": 0,
//         "Comment": "",
//         "Img": "",
//         "Amount": 4,
//         "Barcode": "198877665546",
//         "Cost": 1,
//         "ID": 2,
//         "Item_Count": 1,
//         "Default_Price": 4,
//         "functions": [{
//             "id": 1,
//             "Name": "Item Price",
//             "Amount": 4,
//             "selected": false
//         }, {
//             "id": 2,
//             "Name": "Quantity",
//             "Amount": 1,
//             "selected": false
//         }],
//         "Item_Selected": ""
//     }, {
//         "Item_ID": 4,
//         "Item_Code": "4",
//         "Item_Name": "Drink2",
//         "Item_Name2": "",
//         "SubCategory_ID": 1,
//         "Current_Stock": 0,
//         "Min_Stock": 0,
//         "Comment": "",
//         "Img": "",
//         "Amount": 1.99,
//         "Barcode": "798877665543",
//         "Cost": 1,
//         "ID": 1,
//         "Item_Count": 1,
//         "Default_Price": 1.99,
//         "functions": [{
//             "id": 1,
//             "Name": "Item Price",
//             "Amount": 1.99,
//             "selected": false
//         }, {
//             "id": 2,
//             "Name": "Quantity",
//             "Amount": 1,
//             "selected": false
//         }],
//         "Item_Selected": ""
//     }]
// }, {
//     "OrderID": 3216,
//     "OrderName": "Test",
//     "OrderAmount": 200,
//     "TableNumber": 10,
//     "cartItems": [{
//         "Item_ID": 5,
//         "Item_Code": "6",
//         "Item_Name": "Kid",
//         "Item_Name2": "",
//         "SubCategory_ID": 1,
//         "Current_Stock": 0,
//         "Min_Stock": 0,
//         "Comment": "",
//         "Img": "",
//         "Amount": 4,
//         "Barcode": "198877665546",
//         "Cost": 1,
//         "ID": 2,
//         "Item_Count": 1,
//         "Default_Price": 4,
//         "functions": [{
//             "id": 1,
//             "Name": "Item Price",
//             "Amount": 4,
//             "selected": false
//         }, {
//             "id": 2,
//             "Name": "Quantity",
//             "Amount": 1,
//             "selected": false
//         }],
//         "Item_Selected": ""
//     }, {
//         "Item_ID": 4,
//         "Item_Code": "4",
//         "Item_Name": "Drink2",
//         "Item_Name2": "",
//         "SubCategory_ID": 1,
//         "Current_Stock": 0,
//         "Min_Stock": 0,
//         "Comment": "",
//         "Img": "",
//         "Amount": 1.99,
//         "Barcode": "798877665543",
//         "Cost": 1,
//         "ID": 1,
//         "Item_Count": 1,
//         "Default_Price": 1.99,
//         "functions": [{
//             "id": 1,
//             "Name": "Item Price",
//             "Amount": 1.99,
//             "selected": false
//         }, {
//             "id": 2,
//             "Name": "Quantity",
//             "Amount": 1,
//             "selected": false
//         }],
//         "Item_Selected": ""
//     }]
// }, {
//     "OrderID": 56411,
//     "OrderName": "Test",
//     "OrderAmount": 200,
//     "TableNumber": 10,
//     "cartItems": [{
//         "Item_ID": 6,
//         "Item_Code": "6",
//         "Item_Name": "Kid",
//         "Item_Name2": "",
//         "SubCategory_ID": 1,
//         "Current_Stock": 0,
//         "Min_Stock": 0,
//         "Comment": "",
//         "Img": "",
//         "Amount": 4,
//         "Barcode": "198877665546",
//         "Cost": 1,
//         "ID": 2,
//         "Item_Count": 1,
//         "Default_Price": 4,
//         "functions": [{
//             "id": 1,
//             "Name": "Item Price",
//             "Amount": 4,
//             "selected": false,
//             "$$hashKey": "object:121"
//         }, {
//             "id": 2,
//             "Name": "Quantity",
//             "Amount": 1,
//             "selected": false
//         }],
//         "Item_Selected": ""
//     }, {
//         "Item_ID": 4,
//         "Item_Code": "4",
//         "Item_Name": "Drink2",
//         "Item_Name2": "",
//         "SubCategory_ID": 1,
//         "Current_Stock": 0,
//         "Min_Stock": 0,
//         "Comment": "",
//         "Img": "",
//         "Amount": 1.99,
//         "Barcode": "798877665543",
//         "Cost": 1,
//         "ID": 1,
//         "Item_Count": 1,
//         "Default_Price": 1.99,
//         "functions": [{
//             "id": 1,
//             "Name": "Item Price",
//             "Amount": 1.99,
//             "selected": false
//         }, {
//             "id": 2,
//             "Name": "Quantity",
//             "Amount": 1,
//             "selected": false
//         }],
//         "Item_Selected": ""
//     }]
// }]












[{"OrderName":"Order# 7","TableNumber":"Order# 7","OrderInfo":"","OrderAmount":8.98,"cartItems":[{"Item_ID":3,"Item_Code":"3","Item_Name":"Drink1","Item_Name2":"","SubCategory_ID":2,"Current_Stock":0,"Min_Stock":0,"Comment":"","Img":"","Amount":2.99,"Barcode":"698877665542","Cost":1,"Options":[],"$$hashKey":"object:79","Item_Count":1,"Default_Price":2.99,"functions":[{"id":1,"Name":"Item Price","Amount":2.99,"selected":true},{"id":2,"Name":"Quantity","Amount":1,"selected":false},{"id":3,"Name":"Discount","Amount":0,"selected":false}]},{"Item_ID":4,"Item_Code":"4","Item_Name":"Drink2","Item_Name2":"","SubCategory_ID":2,"Current_Stock":0,"Min_Stock":0,"Comment":"","Img":"","Amount":1.99,"Barcode":"798877665543","Cost":1,"Options":[],"$$hashKey":"object:80","Item_Count":1,"Default_Price":1.99,"functions":[{"id":1,"Name":"Item Price","Amount":1.99,"selected":true},{"id":2,"Name":"Quantity","Amount":1,"selected":false},{"id":3,"Name":"Discount","Amount":0,"selected":false}]},{"Item_ID":6,"Item_Code":"6","Item_Name":"Kid","Item_Name2":"","SubCategory_ID":4,"Current_Stock":0,"Min_Stock":0,"Comment":"","Img":"","Amount":4,"Barcode":"198877665546","Cost":1,"Options":[],"$$hashKey":"object:83","Item_Count":1,"Default_Price":4,"functions":[{"id":1,"Name":"Item Price","Amount":4,"selected":true},{"id":2,"Name":"Quantity","Amount":1,"selected":false},{"id":3,"Name":"Discount","Amount":0,"selected":false}]}],"Order_Amount":"8.98"}]