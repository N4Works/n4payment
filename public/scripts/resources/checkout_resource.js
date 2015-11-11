"use strict";
;
var CheckoutResource = (function () {
    function CheckoutResource($resource) {
        this.provider = $resource("/api/checkouts/:id", { id: "@id" }, {
            update: {
                method: "PUT",
                isArray: false
            }
        });
    }
    CheckoutResource.prototype.save = function (checkout) {
        if (!!checkout._id) {
            return this.provider.update({ id: checkout._id }, checkout)
                .$promise
                .then(function (checkoutData) { return new CheckoutModel(checkoutData); });
        }
        return this.provider.save(checkout)
            .$promise
            .then(function (checkoutData) { return new CheckoutModel(checkoutData); });
    };
    CheckoutResource.prototype.findAll = function () {
        return this.provider.query()
            .$promise
            .then(function (checkouts) { return checkouts.map(function (checkoutData) { return new CheckoutModel(checkoutData); }); });
    };
    CheckoutResource.prototype.findById = function (id) {
        return this.provider.get({ id: id })
            .$promise
            .then(function (checkoutData) { return new CheckoutModel(checkoutData); });
    };
    CheckoutResource.prototype.delete = function (id) {
        return this.provider.delete({ id: id })
            .$promise
            .then(function (checkoutData) { return new CheckoutModel(checkoutData); });
    };
    return CheckoutResource;
})();
angular.module("n4_payment")
    .factory("CheckoutResource", [
    "$resource",
    function ($resource) { return new CheckoutResource($resource); }
]);
