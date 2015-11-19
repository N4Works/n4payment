"use strict";
var ItemsController = (function () {
    function ItemsController(resource, notificationsService, menuService) {
        this.resource = resource;
        this.notificationsService = notificationsService;
        this.menuService = menuService;
        menuService.setPrincipal(new MenuModel("Novo produto", "orange", "add", "/products/new"));
        var self = this;
        resource.findAll()
            .then(function (items) { return self.items = items; })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    }
    ItemsController.prototype.delete = function (item) {
        var self = this;
        this.resource.delete(item._id)
            .then(function () { return self.items.splice(self.items.indexOf(item), 1); })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    };
    return ItemsController;
})();
angular.module("n4_payment")
    .controller("ItemsController", [
    "ItemResource",
    "n4NotificationsService",
    "MenuService",
    ItemsController
]);
