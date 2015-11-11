"use strict";
var CheckoutsController = (function () {
    function CheckoutsController($window, resource, userResource, senderResource, pagseguroResource) {
        this.$window = $window;
        this.resource = resource;
        this.userResource = userResource;
        this.senderResource = senderResource;
        this.pagseguroResource = pagseguroResource;
        this.checkout = new CheckoutModel();
        this.item = new ItemModel();
        var self = this;
        resource.findAll()
            .then(function (checkouts) { return self.checkouts = checkouts; });
        senderResource.findAll()
            .then(function (senders) { return self.senders = senders; });
    }
    CheckoutsController.prototype.selectSender = function (sender) {
        this.checkout.sender = sender;
    };
    CheckoutsController.prototype.save = function () {
        var self = this;
        this.resource.save(this.checkout)
            .then(function (checkout) {
            if (!self.checkout._id) {
                self.checkouts.unshift(checkout);
            }
            self.checkout = new CheckoutModel();
        })
            .catch(function (error) { return console.log(error); });
    };
    CheckoutsController.prototype.edit = function (checkout) {
        var _this = this;
        this.resource.findById(checkout._id)
            .then(function (checkoutCompleto) {
            _this.checkout = angular.extend(checkout, checkoutCompleto);
        })
            .catch(function (e) { return console.log(e); });
    };
    CheckoutsController.prototype.delete = function (checkout) {
        var self = this;
        this.resource.delete(checkout._id)
            .then(function () { return self.checkouts.splice(self.checkouts.indexOf(checkout), 1); })
            .catch(function (error) { return console.log(error); });
    };
    CheckoutsController.prototype.send = function (checkout) {
        var self = this;
        this.pagseguroResource.send(checkout)
            .then(function (redirectURL) { return self.$window.location.href = redirectURL; })
            .catch(function (e) { return console.log(e); });
    };
    CheckoutsController.prototype.editItem = function (item) {
        this.itemSelected = item;
        this.item = new ItemModel(angular.copy(item));
    };
    CheckoutsController.prototype.saveItem = function () {
        var indice = this.checkout.items.indexOf(this.itemSelected);
        this.checkout.items.splice(indice, 1, this.item);
        delete this.itemSelected;
        this.item = new ItemModel();
    };
    CheckoutsController.prototype.deleteItem = function (item) {
        var indice = this.checkout.items.indexOf(item);
        this.checkout.items.splice(indice, 1);
    };
    return CheckoutsController;
})();
angular.module("n4_payment")
    .controller("CheckoutsController", [
    "$window",
    "CheckoutResource",
    "UserResource",
    "SenderResource",
    "PagSeguroResource",
    CheckoutsController
]);
