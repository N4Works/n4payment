"use strict";

angular.module("n4_payment", [
    "ngResource",
    "ngRoute",
    "n4Notifications",
    "n4ExceptionInterceptor"
])
    .config([
    "$locationProvider",
    "$routeProvider",
    ($locationProvider: ng.ILocationProvider, $routeProvider: ng.route.IRouteProvider) => {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when("/", {
                name: "transactions",
                templateUrl: "views/main.html",
                controller: "MainController",
                controllerAs: "controller"
            })
            .when("/users", {
                name: "users",
                templateUrl: "views/users.html",
                controller: "UsersController",
                controllerAs: "controller"
            })
            .when("/users/new", {
                name: "users",
                templateUrl: "views/user.html",
                controller: "UserController",
                controllerAs: "controller"
            })
            .when("/users/:id", {
                name: "users",
                templateUrl: "views/user.html",
                controller: "UserController",
                controllerAs: "controller"
            })
            .when("/senders", {
                name: "senders",
                templateUrl: "views/senders.html",
                controller: "SendersController",
                controllerAs: "controller"
            })
            .when("/senders/new", {
                name: "senders",
                templateUrl: "views/sender.html",
                controller: "SenderController",
                controllerAs: "controller"
            })
            .when("/senders/:id", {
                name: "senders",
                templateUrl: "views/sender.html",
                controller: "SenderController",
                controllerAs: "controller"
            })
            .when("/checkouts", {
                name: "checkouts",
                templateUrl: "views/checkouts.html",
                controller: "CheckoutsController",
                controllerAs: "controller"
            })
            .when("/checkouts/new", {
                name: "checkouts",
                templateUrl: "views/checkout.html",
                controller: "CheckoutController",
                controllerAs: "controller"
            })
            .when("/checkouts/:id", {
                name: "checkout",
                templateUrl: "views/checkout.html",
                controller: "CheckoutController",
                controllerAs: "controller"
            })
            .when("/items", {
                name: "items",
                templateUrl: "views/items.html",
                controller: "ItemsController",
                controllerAs: "controller"
            })
            .when("/items/new", {
                name: "items",
                templateUrl: "views/item.html",
                controller: "ItemController",
                controllerAs: "controller"
            })
            .when("/items/:id", {
                name: "items",
                templateUrl: "views/item.html",
                controller: "ItemController",
                controllerAs: "controller"
            })
            .otherwise({
                redirectTo: "/"
            });
    }
]);
