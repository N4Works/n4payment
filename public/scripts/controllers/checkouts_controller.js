"use strict";
var CheckoutsController = (function () {
    function CheckoutsController(resource, userResource, senderResource) {
        this.resource = resource;
        this.userResource = userResource;
        this.senderResource = senderResource;
        this.checkout = new CheckoutModel();
        this.item = new ItemModel();
        var self = this;
        resource.findAll()
            .then(function (checkouts) { return self.checkouts = checkouts; });
        senderResource.findAll()
            .then(function (senders) { return self.senders = senders; });
        userResource.findAll()
            .then(function (users) { return self.users = users; });
    }
    CheckoutsController.prototype.selectUser = function (user) {
        this.checkout.receiver = user;
    };
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
        this.checkout = checkout;
    };
    CheckoutsController.prototype.delete = function (checkout) {
        var self = this;
        this.resource.delete(checkout._id)
            .then(function () { return self.checkouts.splice(self.checkouts.indexOf(checkout), 1); })
            .catch(function (error) { return console.log(error); });
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
    "CheckoutResource",
    "UserResource",
    "SenderResource",
    CheckoutsController
]);
