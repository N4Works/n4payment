"use strict";

angular.module("n4_payment", [
    "ngResource",
    "ngRoute"
])
    .config([
    "$routeProvider",
    ($routeProvider: ng.route.IRouteProvider) => {
        $routeProvider
            .when("/", {
            templateUrl: "views/main.html",
            controller: "MainController",
            controllerAs: "controller"
        });
    }
]);
