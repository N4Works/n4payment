"use strict";
angular.module("n4_payment", [
    "ngResource",
    "n4Notifications",
    "n4ExceptionInterceptor",
    "angular-md5"
])
    .config([
    "$locationProvider",
    function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);
    }
]);
