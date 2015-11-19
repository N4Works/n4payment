"use strict";
var CheckoutController = (function () {
    function CheckoutController(resource, parameters, location, $window, filter, senderResource, pagseguroResource, itemResource, notificationsService, menuService) {
        this.resource = resource;
        this.parameters = parameters;
        this.location = location;
        this.$window = $window;
        this.filter = filter;
        this.senderResource = senderResource;
        this.pagseguroResource = pagseguroResource;
        this.itemResource = itemResource;
        this.notificationsService = notificationsService;
        this.menuService = menuService;
        menuService.setPrincipal(new MenuModel("Comprar", "red", "add", "/checkouts/new"));
        var self = this;
        this.checkout = new CheckoutModel();
        senderResource.findAll()
            .then(function (senders) { return self.senders = senders; })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
        itemResource.findAll()
            .then(function (items) { return self.items = items; })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
        if (parameters["id"]) {
            resource.findById(parameters["id"])
                .then(function (checkout) { return self.checkout = checkout; })
                .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
        }
    }
    CheckoutController.prototype.selectSender = function (sender) {
        this.checkout.sender = sender;
    };
    CheckoutController.prototype.senderIsSelected = function (sender) {
        return this.checkout.sender._id === sender._id;
    };
    CheckoutController.prototype.itemIsSelected = function (item) {
        var filtered = this.filter(this.checkout.items, { _id: item._id });
        return filtered.length;
    };
    CheckoutController.prototype.selectItem = function (item) {
        var filtered = this.filter(this.checkout.items, { _id: item._id });
        if (filtered.length) {
            this.checkout.items.splice(this.checkout.items.indexOf(filtered[0]), 1);
        }
        else {
            this.checkout.items.push(item);
        }
    };
    CheckoutController.prototype.save = function () {
        var self = this;
        this.resource.save(this.checkout)
            .then(function (checkout) {
            self.notificationsService.notifySuccess("Cadastro realizado.", "Ok");
            self.location.path("/checkouts");
        })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    };
    CheckoutController.prototype.delete = function () {
        var self = this;
        this.resource.delete(this.checkout._id)
            .then(function () { return self.location.path("/checkouts"); })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    };
    return CheckoutController;
})();
angular.module("n4_payment")
    .controller("CheckoutController", [
    "CheckoutResource",
    "$routeParams",
    "$location",
    "$window",
    "filterFilter",
    "SenderResource",
    "PagSeguroResource",
    "ItemResource",
    "n4NotificationsService",
    "MenuService",
    CheckoutController
]);
