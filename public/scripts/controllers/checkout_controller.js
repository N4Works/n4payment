"use strict";
var CheckoutController = (function () {
    function CheckoutController(resource, parameters, location, $window, $q, filter, senderResource, pagseguroResource, itemResource, notificationsService, menuService) {
        this.resource = resource;
        this.parameters = parameters;
        this.location = location;
        this.$window = $window;
        this.$q = $q;
        this.filter = filter;
        this.senderResource = senderResource;
        this.pagseguroResource = pagseguroResource;
        this.itemResource = itemResource;
        this.notificationsService = notificationsService;
        this.menuService = menuService;
        menuService.setPrincipal(new MenuModel("Novo pagamento", "red", "add", "/checkouts/new"));
        var self = this;
        this.checkout = new CheckoutModel();
        senderResource.findAll()
            .then(function (senders) { return self.senders = senders; })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
        var itemPromise = itemResource.findAll()
            .then(function (items) { return self.items = items; })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
        if (parameters["id"]) {
            $q.all([itemPromise,
                resource.findById(parameters["id"])
                    .then(function (checkout) { return self.checkout = checkout; })
                    .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); })])
                .then(function (results) {
                angular.forEach(results[1].items, function (i) {
                    var item = filter(results[0], { _id: i._id })[0];
                    item.quantity = i.quantity;
                });
            });
        }
    }
    CheckoutController.prototype.selectSender = function (sender) {
        this.checkout.sender = sender;
    };
    CheckoutController.prototype.senderIsSelected = function (sender) {
        return this.checkout.sender._id === sender._id;
    };
    CheckoutController.prototype.itemIsSelected = function (item) {
        return !!item.quantity;
    };
    CheckoutController.prototype.save = function () {
        var self = this;
        this.checkout.items = this.filter(this.items, function (item) { return item.quantity > 0; });
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
    "$q",
    "filterFilter",
    "SenderResource",
    "PagSeguroResource",
    "ItemResource",
    "n4NotificationsService",
    "MenuService",
    CheckoutController
]);
