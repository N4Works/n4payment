"use strict";
var CheckoutsController = (function () {
    function CheckoutsController($window, filter, resource, pagseguroResource, notificationsService, menuService) {
        this.$window = $window;
        this.filter = filter;
        this.resource = resource;
        this.pagseguroResource = pagseguroResource;
        this.notificationsService = notificationsService;
        this.menuService = menuService;
        menuService.setPrincipal(new MenuModel("Comprar", "red", "add", "/checkouts/new"));
        var self = this;
        resource.findAll()
            .then(function (checkouts) { return self.checkouts = checkouts; })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    }
    CheckoutsController.prototype.delete = function (checkout) {
        var self = this;
        this.resource.delete(checkout._id)
            .then(function () { return self.checkouts.splice(self.checkouts.indexOf(checkout), 1); })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    };
    CheckoutsController.prototype.send = function (checkout) {
        var self = this;
        this.pagseguroResource.send(checkout)
            .then(function (redirectURL) { return self.$window.location.href = redirectURL; })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    };
    return CheckoutsController;
})();
angular.module("n4_payment")
    .controller("CheckoutsController", [
    "$window",
    "filterFilter",
    "CheckoutResource",
    "PagSeguroResource",
    "n4NotificationsService",
    "MenuService",
    CheckoutsController
]);
