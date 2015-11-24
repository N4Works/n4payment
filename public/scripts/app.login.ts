"use strict";

angular.module("n4_payment", [
    "ngResource",
    "n4Notifications",
    "n4ExceptionInterceptor",
    "angular-md5"
])
    .config([
    "$locationProvider",
    ($locationProvider: ng.ILocationProvider, $routeProvider: ng.route.IRouteProvider) => {
        $locationProvider.html5Mode(true);
    }
]);
