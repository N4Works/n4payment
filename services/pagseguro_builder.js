"use strict";
var checkout_model_1 = require("../models/checkout_model");
var sender_builder_1 = require("./sender_builder");
var item_builder_1 = require("./item_builder");
var shipping_builder_1 = require("./shipping_builder");
var checkout_service_1 = require("./checkout_service");
var urlpagseguro_enum_1 = require("../models/urlpagseguro_enum");
var request = require("request");
var xml2json = require("xml2json");
var EnumPayment;
(function (EnumPayment) {
    EnumPayment[EnumPayment["payment"] = 0] = "payment";
    EnumPayment[EnumPayment["subscription"] = 1] = "subscription";
})(EnumPayment || (EnumPayment = {}));
var PaymentBuilder = (function () {
    function PaymentBuilder(pagSeguroBuilder, user) {
        this.pagSeguroBuilder = pagSeguroBuilder;
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
        return this.pagSeguroBuilder.send(this.checkout);
    };
    return PaymentBuilder;
})();
var SubscriptionBuilder = (function () {
    function SubscriptionBuilder(pagSeguroBuilder, user) {
        this.pagSeguroBuilder = pagSeguroBuilder;
        this.user = user;
    }
    SubscriptionBuilder.prototype.return = function () {
        return this.pagSeguroBuilder;
    };
    return SubscriptionBuilder;
})();
var PagSeguroBuilder = (function () {
    function PagSeguroBuilder() {
    }
    PagSeguroBuilder.createPaymentFor = function (user) {
        var builder = new PagSeguroBuilder();
        return new PaymentBuilder(builder, user);
    };
    PagSeguroBuilder.createSubscriptionFor = function (user) {
        var builder = new PagSeguroBuilder();
        return new SubscriptionBuilder(builder, user);
    };
    PagSeguroBuilder.prototype.send = function (checkout) {
        return new Promise(function (resolve, reject) {
            var checkoutService = new checkout_service_1.CheckoutService();
            checkoutService.insert(checkout)
                .then(function (c) {
                return checkoutService.getXML(c);
            })
                .then(function (xml) {
                var urlCheckout = process.env.NODE_ENV === "production" ? urlpagseguro_enum_1.EnumURLPagSeguro.checkout_production : urlpagseguro_enum_1.EnumURLPagSeguro.checkout_development;
                var requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/xml; charset=UTF-8"
                    },
                    uri: urlCheckout + "?email=" + checkout.receiver.email + "&token=" + checkout.receiver.token,
                    body: xml
                };
                request(requestOptions, function (error, response, body) {
                    if (!!error) {
                        return reject(error);
                    }
                    var checkout = JSON.parse(xml2json.toJson(body)).checkout;
                    var urlPayment = process.env.NODE_ENV === "production" ? urlpagseguro_enum_1.EnumURLPagSeguro.payment_production : urlpagseguro_enum_1.EnumURLPagSeguro.payment_development;
                    return resolve(urlPayment + "?code=" + checkout.code);
                });
            })
                .catch(function (error) { return reject(error); });
        });
    };
    return PagSeguroBuilder;
})();
exports.PagSeguroBuilder = PagSeguroBuilder;
