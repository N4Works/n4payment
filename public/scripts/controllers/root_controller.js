"use strict";
var RootController = (function () {
    function RootController(route) {
        this.route = route;
    }
    return RootController;
})();
angular.module("n4_payment")
    .controller("RootController", [
    "$route",
    RootController
]);
