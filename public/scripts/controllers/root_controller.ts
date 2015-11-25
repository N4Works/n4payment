"use strict";

class RootController {
    menu: MenuModel;
    user: UserModel;
    constructor(
        public route: ng.route.IRouteService,
        public menuService: MenuService,
        private loginResource: LoginResource,
        private notificationsService: n4Notifications.N4NotificationsService,
        private $window: ng.IWindowService) {
        menuService.add(new MenuModel("Vendedores", "blue", "settings", "/users"))
            .add(new MenuModel("Compradores", "yellow darken-2", "person", "/senders"))
            .add(new MenuModel("Produtos / Serviços", "orange", "card_giftcard", "/products"))
            .add(new MenuModel("Pagamentos", "red", "shopping_cart", "/checkouts"));

        menuService.setPrincipal(new MenuModel("Comprar", "red", "add", "/checkouts/new"));

        var self = this;
        loginResource.getUser()
            .then(user => self.user = user)
            .catch(e => self.notificationsService.notifyAlert(e.message, "Ok"));
    };

    selectMenu(menu: MenuModel) {
        this.menu = menu;
    }

    logout() {
        var self = this;
        this.loginResource.logout()
            .then(() => self.$window.location.href = "http://localhost:3000/login.html")
            .catch(e => self.notificationsService.notifyAlert(e.message, "Ok"));
    }
}

angular.module("n4_payment")
    .controller("RootController", [
    "$route",
    "MenuService",
    "LoginResource",
    "n4NotificationsService",
    "$window",
    RootController
]);
