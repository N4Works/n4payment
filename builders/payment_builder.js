"use strict";
var checkout_model_1 = require("../models/checkout_model");
var sender_builder_1 = require("./sender_builder");
var item_builder_1 = require("./item_builder");
var shipping_builder_1 = require("./shipping_builder");
var pagseguro_service_1 = require("../services/pagseguro_service");
var xml2json = require("xml2json");
var EnumPayment;
(function (EnumPayment) {
    EnumPayment[EnumPayment["payment"] = 0] = "payment";
    EnumPayment[EnumPayment["subscription"] = 1] = "subscription";
})(EnumPayment || (EnumPayment = {}));
var PaymentBuilder = (function () {
    function PaymentBuilder(user) {
        this.user = user;
        this.checkout = new checkout_model_1.Checkout();
        this.checkout.receiver = user;
    }
    PaymentBuilder.prototype.to = function (sender) {
        if (!!sender) {
            this.checkout.sender = sender;
        }
        return new sender_builder_1.SenderBuilder(this);
    };
    PaymentBuilder.prototype.inCurrency = function (currency) {
        this.checkout.currency = currency;
        return this;
    };
    PaymentBuilder.prototype.withReference = function (reference) {
        this.checkout.reference = reference;
        return this;
    };
    PaymentBuilder.prototype.withItem = function (item) {
        if (!!item) {
            this.checkout.items.push(item);
        }
        return new item_builder_1.ItemBuilder(this);
    };
    PaymentBuilder.prototype.withShipping = function (shipping) {
        if (!!shipping) {
            this.checkout.shipping = shipping;
        }
        return new shipping_builder_1.ShippingBuilder(this);
    };
    PaymentBuilder.prototype.withExtraAmount = function (extraAmount) {
        this.checkout.extraAmount = extraAmount;
        return this;
    };
    PaymentBuilder.prototype.withRedirectURL = function (redirectURL) {
        this.checkout.redirectURL = redirectURL;
        return this;
    };
    PaymentBuilder.prototype.withNotificationURL = function (notificationURL) {
        this.checkout.notificationURL = notificationURL;
        return this;
    };
    PaymentBuilder.prototype.withMaxUses = function (maxUses) {
        this.checkout.maxUses = maxUses;
        return this;
    };
    PaymentBuilder.prototype.withMaxAge = function (maxAge) {
        this.checkout.maxAge = maxAge;
        return this;
    };
    PaymentBuilder.prototype.send = function () {
        var pagseguroService = new pagseguro_service_1.PagSeguroService(this.user);
        return pagseguroService.sendPayment(this.checkout);
    };
    return PaymentBuilder;
})();
exports.PaymentBuilder = PaymentBuilder;
