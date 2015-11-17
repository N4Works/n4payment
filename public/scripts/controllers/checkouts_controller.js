"use strict";
var CheckoutsController = (function () {
    function CheckoutsController($window, filter, resource, pagseguroResource) {
        this.$window = $window;
        this.filter = filter;
        this.resource = resource;
        this.pagseguroResource = pagseguroResource;
        this.checkout = new CheckoutModel();
        var self = this;
        resource.findAll()
            .then(function (checkouts) { return self.checkouts = checkouts; });
    }
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
    return CheckoutsController;
})();
angular.module("n4_payment")
    .controller("CheckoutsController", [
    "$window",
    "filterFilter",
    "CheckoutResource",
    "PagSeguroResource",
    CheckoutsController
]);
