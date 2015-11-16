"use strict";

class RootController {
    constructor(public route:ng.route.IRouteService) {
    }
}

angular.module("n4_payment")
    .controller("RootController", [
    "$route",
    RootController
]);
