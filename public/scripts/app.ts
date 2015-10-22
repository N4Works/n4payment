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
            })
            .when("/users", {
                templateUrl: "views/users.html",
                controller: "UsersController",
                controllerAs: "controller"
            })
            .when("/senders", {
                templateUrl: "views/senders.html",
                controller: "SendersController",
                controllerAs: "controller"
            })
            .when("/checkouts", {
                templateUrl: "views/checkouts.html",
                controller: "CheckoutsController",
                controllerAs: "controller"
            });
    }
]);
