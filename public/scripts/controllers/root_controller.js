"use strict";
var RootController = (function () {
    function RootController(route, menuService, loginResource, notificationsService, $window) {
        this.route = route;
        this.menuService = menuService;
        this.loginResource = loginResource;
        this.notificationsService = notificationsService;
        this.$window = $window;
        menuService.add(new MenuModel("Vendedores", "blue", "settings", "/users"))
            .add(new MenuModel("Compradores", "yellow darken-2", "person", "/senders"))
            .add(new MenuModel("Produtos / Serviços", "orange", "card_giftcard", "/products"))
            .add(new MenuModel("Pagamentos", "red", "shopping_cart", "/checkouts"));
        menuService.setPrincipal(new MenuModel("Comprar", "red", "add", "/checkouts/new"));
        var self = this;
        loginResource.getUser()
            .then(function (user) { return self.user = user; })
            .catch(function (e) { return self.notificationsService.notifyAlert(e.message, "Ok"); });
    }
    ;
    RootController.prototype.selectMenu = function (menu) {
        this.menu = menu;
    };
    RootController.prototype.logout = function () {
        var self = this;
        this.loginResource.logout()
            .then(function () { return self.$window.location.href = "http://localhost:3000/login.html"; })
            .catch(function (e) { return self.notificationsService.notifyAlert(e.message, "Ok"); });
    };
    return RootController;
})();
angular.module("n4_payment")
    .controller("RootController", [
    "$route",
    "MenuService",
    "LoginResource",
    "n4NotificationsService",
    "$window",
    RootController
]);
