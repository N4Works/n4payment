"use strict";

class RootController {
    menu:MenuModel;
    constructor(public route:ng.route.IRouteService, public menuService: MenuService) {
        menuService.add(new MenuModel("Vendedores", "blue", "settings", "/users"))
            .add(new MenuModel("Compradores", "yellow darken-2", "person", "/senders"))
            .add(new MenuModel("Produtos / Serviços", "orange", "card_giftcard", "/products"))
            .add(new MenuModel("Pagamentos", "red", "shopping_cart", "/checkouts"));

        menuService.setPrincipal(new MenuModel("Comprar", "red", "add", "/checkouts/new"));
    };

    selectMenu(menu:MenuModel) {
        this.menu = menu;
    }
}

angular.module("n4_payment")
    .controller("RootController", [
    "$route",
    "MenuService",
    RootController
]);
