"use strict";

angular.module("n4_payment")
    .config([
    "$locationProvider",
    ($locationProvider: ng.ILocationProvider, $routeProvider: ng.route.IRouteProvider) => {
        $locationProvider.html5Mode(true);
    }
]);
