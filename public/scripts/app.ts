"use strict";

angular.module("n4_payment", [
    "ngResource",
    "ngRoute",
    "n4Notifications",
    "n4ExceptionInterceptor",
    "n4AuthenticationInterceptor",
    "n4DateInput",
    "n4NumberInput",
    "n4CurrencyInput",
    "angular-md5"
])
    .config([
    "BASE_URL",
    "$locationProvider",
    "$routeProvider",
    "n4AuthenticationInterceptorProvider",
    (BASE_URL:string, $locationProvider: ng.ILocationProvider, $routeProvider: ng.route.IRouteProvider, authProvider: any) => {
        authProvider.redirectURL = `${BASE_URL}/login.html`;

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
            .when("/products", {
            name: "items",
            templateUrl: "views/items.html",
            controller: "ItemsController",
            controllerAs: "controller"
        })
            .when("/products/new", {
            name: "items",
            templateUrl: "views/item.html",
            controller: "ItemController",
            controllerAs: "controller"
        })
            .when("/products/:id", {
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
