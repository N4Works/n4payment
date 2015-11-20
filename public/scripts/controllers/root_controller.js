"use strict";
var RootController = (function () {
    function RootController(route, menuService) {
        this.route = route;
        this.menuService = menuService;
        menuService.add(new MenuModel("Vendedores", "blue", "settings", "/users"))
            .add(new MenuModel("Compradores", "yellow darken-2", "person", "/senders"))
            .add(new MenuModel("Produtos / Serviços", "orange", "card_giftcard", "/products"))
            .add(new MenuModel("Pagamentos", "red", "shopping_cart", "/checkouts"));
        menuService.setPrincipal(new MenuModel("Comprar", "red", "add", "/checkouts/new"));
    }
    ;
    RootController.prototype.selectMenu = function (menu) {
        this.menu = menu;
    };
    return RootController;
})();
angular.module("n4_payment")
    .controller("RootController", [
    "$route",
    "MenuService",
    RootController
]);
