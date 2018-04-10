 'use strict';

/**
 * @ngdoc overview
 * @name monarchApp
 * @description
 * # monarchApp
 *
 * Main module of the application.
 */
angular
  .module('monarchApp', [
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'autocomplete',
    'angularResizable',
    'ngKeypad',
    'angucomplete-alt'
  ]).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);
      // $locationProvider.html5Mode({
      // enabled: true,
      // requireBase: false
      // });
      
      
    $routeProvider
      .when('/masterLogin', {
        templateUrl: 'views/master_login.html',
        controller: 'MasterLoginCtrl'
      })
      .when('/', { // login
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/main', { // main
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/payment', { // payment
        templateUrl: 'views/payment.html',
        controller: 'PayCtrl'
      })
      .when('/inventory', { //inventory
        templateUrl: 'views/inventory.html',
        controller: 'InventoryCtrl'
      })
      .when('/about', { // about
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/sync', { // sync
        templateUrl: 'views/sync.html',
        controller: 'SyncCtrl'
      })
      .when('/customerInfo', { //customerInfo
        templateUrl: 'views/customerInfo.html',
        controller: 'CustomerInfoCtrl'
      })
      .when('/reports', { //customerInfo
        templateUrl: 'views/reports.html',
        controller: 'ReportsCtrl'
      })
      .when('/categories', { //categories
        templateUrl: 'views/categories.html',
        controller: 'CategoryCtrl'
      })
      .when('/cart', { // cart
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl'
      })
      .when('/search', { // search
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/native', { // native
        templateUrl: 'views/search_n.html',
        controller: 'NativeSerachCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
  }])
    .config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('orange');
});

 