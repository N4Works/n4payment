"use strict";
var CheckoutsController = (function () {
    function CheckoutsController($window, filter, resource, senderResource, pagseguroResource, itemResource) {
        this.$window = $window;
        this.filter = filter;
        this.resource = resource;
        this.senderResource = senderResource;
        this.pagseguroResource = pagseguroResource;
        this.itemResource = itemResource;
        this.checkout = new CheckoutModel();
        var self = this;
        resource.findAll()
            .then(function (checkouts) { return self.checkouts = checkouts; });
        senderResource.findAll()
            .then(function (senders) { return self.senders = senders; });
        itemResource.findAll()
            .then(function (items) { return self.items = items; });
    }
    CheckoutsController.prototype.selectSender = function (sender) {
        this.checkout.sender = sender;
    };
    CheckoutsController.prototype.senderIsSelected = function (sender) {
        return this.checkout.sender._id === sender._id;
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
    CheckoutsController.prototype.itemIsSelected = function (item) {
        var filtered = this.filter(this.checkout.items, { _id: item._id });
        return filtered.length;
    };
    CheckoutsController.prototype.selectItem = function (item) {
        var filtered = this.filter(this.checkout.items, { _id: item._id });
        if (filtered.length) {
            this.checkout.items.splice(this.checkout.items.indexOf(filtered[0]), 1);
        }
        else {
            this.checkout.items.push(item);
        }
    };
    return CheckoutsController;
})();
angular.module("n4_payment")
    .controller("CheckoutsController", [
    "$window",
    "filterFilter",
    "CheckoutResource",
    "SenderResource",
    "PagSeguroResource",
    "ItemResource",
    CheckoutsController
]);
