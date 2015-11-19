"use strict";
var ItemController = (function () {
    function ItemController(resource, parameters, location, notificationsService, menuService) {
        this.resource = resource;
        this.parameters = parameters;
        this.location = location;
        this.notificationsService = notificationsService;
        this.menuService = menuService;
        menuService.setPrincipal(new MenuModel("Novo produto", "orange", "add", "/products/new"));
        var self = this;
        this.item = new ItemModel();
        if (parameters["id"]) {
            resource.findById(parameters["id"])
                .then(function (item) { return self.item = item; })
                .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
        }
    }
    ItemController.prototype.save = function () {
        var self = this;
        this.resource.save(this.item)
            .then(function (item) {
            self.notificationsService.notifySuccess("Cadastro realizado.", "Ok");
            self.location.path("/products");
        })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    };
    ItemController.prototype.delete = function () {
        var self = this;
        this.resource.delete(this.item._id)
            .then(function () { return self.location.path("/products"); })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    };
    return ItemController;
})();
angular.module("n4_payment")
    .controller("ItemController", [
    "ItemResource",
    "$routeParams",
    "$location",
    "n4NotificationsService",
    "MenuService",
    ItemController
]);
