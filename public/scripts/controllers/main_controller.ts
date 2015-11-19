"use strict";

class MainController {
    constructor(private menuService: MenuService) {
        menuService.setPrincipal(new MenuModel("Comprar", "red", "add", "/checkouts/new"));
    }
}

angular.module("n4_payment")
    .controller("MainController", [
        "MenuService",
        MainController
]);
