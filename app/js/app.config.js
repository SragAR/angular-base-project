'use strict';
angular.
module('globalCatalog')
.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $routeProvider.
        when('/login', {
            template: '<login></login>',
        })
        .otherwise('/login');
    }
]);
