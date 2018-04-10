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
.service('myPrzoducts', function() {
        return {
            foo: function() {
                alert("I'm foo!");
            }
        };
})
.service('myMenu', function() {
        var menuItems = [{"Name":"Settings"},{"Name":"Transaction"},{"Name":"Payment"}];
        return {
            menuItems: function() {
                return menuItems;
            },
            
        };
});

