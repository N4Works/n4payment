"use strict";
angular.module("n4_payment", [
    "ngResource",
    "ngRoute"
])
    .config([
    "$routeProvider",
    function ($routeProvider) {
        $routeProvider
            .when("/", {
            templateUrl: "views/main.html",
            controller: "MainController",
            controllerAs: "controller"
        });
    }
]);
