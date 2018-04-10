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
.directive('myItem', function() {
        return {
        template: '<div class="c-item {{item.Item_Selected}}" id="item{{item.Item_Name}}"><header class="item-header"><span class="item-price">{{item.Amount}}</span><h3 class="item-name" ng-click="selectCartItem(item, $index);openOptions(item)">{{item.Item_Name}}</h3><md-button class="item-remove" ng-click="removefromCart(item, $index)"><i class="material-icons md-18 menu-icon">close</i></md-button><span class="item-count">{{item.Item_Count}}</span></header><section class="item-funtions"><span class="item-function"><p class="name">Discount <b>25</b></p> </span><span class="item-function"><p class="name">iscount <b>25</b></p></span><span class="item-function"><p class="name">Discount <b>25</b></p></span></section></div>'
    };
})
.directive('myLoader', function() {
        return {
        template: '<div id="mainloader"><span class="loader-wrap"><md-progress-circular md-mode="indeterminate" class="md-accent md-hue-3" md-diameter="60"></md-progress-circular></span></div>',
    	scope: {
      show: '='
    },
    link:function postLink(scope, element, attrs){

    	}
    };
});

//ng-class=" item-price :  \'fa-angle-down\'  " <i class="material-icons">keyboard_arrow_down</i>

