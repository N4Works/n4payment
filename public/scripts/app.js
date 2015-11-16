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
            controllerAs: "controller",
            resolve: {
                user: [
                    "$q",
                    function (q) { return q.resolve(new UserModel()); }
                ]
            }
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
            .when("/checkouts", {
            name: "checkouts",
            templateUrl: "views/checkouts.html",
            controller: "CheckoutsController",
            controllerAs: "controller"
        })
            .when("/items", {
            name: "items",
            templateUrl: "views/items.html",
            controller: "ItemsController",
            controllerAs: "controller"
        })
            .otherwise({
            redirectTo: "/"
        });
    }
]);
