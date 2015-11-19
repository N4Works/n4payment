"use strict";
var MainController = (function () {
    function MainController(menuService) {
        this.menuService = menuService;
        menuService.setPrincipal(new MenuModel("Comprar", "red", "add", "/checkouts/new"));
    }
    return MainController;
})();
angular.module("n4_payment")
    .controller("MainController", [
    "MenuService",
    MainController
]);
