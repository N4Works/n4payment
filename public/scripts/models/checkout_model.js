"use strict";
var CheckoutModel = (function () {
    function CheckoutModel(checkoutData) {
        if (!!checkoutData) {
            angular.extend(this, checkoutData);
        }
        this.sender = new SenderModel(this.sender);
        this.receiver = new UserModel(this.receiver);
        this.shipping = new ShippingModel(this.shipping);
        this.items = !!this.items && this.items.length > 0 ? this.items.map(function (i) { return new ItemModel(i); }) : [new ItemModel()];
    }
    return CheckoutModel;
})();
angular.module("n4_payment")
    .factory("CheckoutModel", function () { return CheckoutModel; });
