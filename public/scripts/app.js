"use strict";
angular.module("n4_payment", [
    "ngResource",
    "ngRoute"
])
    .config([
    "$locationProvider",
    "$routeProvider",
    function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);
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
        })
            .when("/transactions", {
            templateUrl: "views/transactions.html",
            controller: "TransactionsController",
            controllerAs: "controller"
        })
            .when("/confirmation", {
            templateUrl: "views/confirmation.html",
        })
            .otherwise({
            redirectTo: "/"
        });
    }
]);
