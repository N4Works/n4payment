"use strict";
var checkout_model_1 = require("../models/checkout_model");
var sender_builder_1 = require("./sender_builder");
var item_builder_1 = require("./item_builder");
var shipping_builder_1 = require("./shipping_builder");
var request = require("request");
var jsontoxml = require("jsontoxml");
var EnumURLPagSeguro = (function () {
    function EnumURLPagSeguro() {
    }
    EnumURLPagSeguro.development = "https://ws.sandbox.pagseguro.uol.com.br/v2/checkout";
    EnumURLPagSeguro.production = "https://ws.pagseguro.uol.com.br/v2/checkout";
    return EnumURLPagSeguro;
})();
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
        this.url = EnumURLPagSeguro.development;
        this.url = process.env.NODE_ENV === "production" ? EnumURLPagSeguro.production : EnumURLPagSeguro.development;
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
        var self = this;
        return new Promise(function (resolve, reject) {
            var options = {
                xmlHeader: {
                    standalone: true
                },
                prettyPrint: true
            };
            var xml = jsontoxml({
                checkout: {
                    currency: checkout.currency,
                    reference: checkout.reference,
                    redirectURL: checkout.redirectURL,
                    notificationURL: checkout.notificationURL,
                    maxUses: checkout.maxUses,
                    maxAge: checkout.maxAge,
                    sender: {
                        name: checkout.sender.name,
                        email: checkout.sender.email,
                        bornDate: checkout.sender.bornDate.toISOString().replace(/^(\d{4})-(\d{2})-(\d{2}).*$/, "$3/$2/$1"),
                        phone: {
                            areaCode: checkout.sender.phone.areaCode,
                            number: checkout.sender.phone.number
                        },
                        documents: checkout.sender.documents.map(function (d) {
                            return {
                                document: {
                                    type: d.type,
                                    value: d.value
                                }
                            };
                        })
                    },
                    items: checkout.items.map(function (i) {
                        return {
                            item: {
                                id: i.id,
                                description: i.description,
                                amount: i.amount.toFixed(2),
                                quantity: i.quantity.toFixed(0),
                                shippingCost: i.shippingCost.toFixed(2),
                                weight: i.weight.toFixed(0)
                            }
                        };
                    }),
                    shipping: {
                        type: checkout.shipping.type,
                        cost: checkout.shipping.cost.toFixed(2),
                        address: {
                            street: checkout.shipping.address.street,
                            number: checkout.shipping.address.number,
                            postalCode: checkout.shipping.address.postalCode,
                            city: checkout.shipping.address.city,
                            state: checkout.shipping.address.state,
                            country: checkout.shipping.address.country,
                            complement: checkout.shipping.address.complement,
                            district: checkout.shipping.address.district
                        }
                    }
                }
            }, options);
            var requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/xml; charset=UTF-8"
                },
                uri: self.url + ("?email=" + checkout.receiver.email + "&token=" + checkout.receiver.token),
                body: xml
            };
            request(requestOptions, function (error, response, body) {
                console.log(error);
                console.log(response);
                resolve(body);
                return;
            });
        });
    };
    return PagSeguroBuilder;
})();
exports.PagSeguroBuilder = PagSeguroBuilder;
