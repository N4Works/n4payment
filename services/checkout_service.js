"use strict";
var checkout_model_1 = require("../models/checkout_model");
var jsontoxml = require("jsontoxml");
var CheckoutService = (function () {
    function CheckoutService(Checkout) {
        if (Checkout === void 0) { Checkout = checkout_model_1.Checkout; }
        this.Checkout = Checkout;
    }
    ;
    CheckoutService.prototype.find = function (filtro) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return self.Checkout.find(filtro, function (error, checkouts) {
                return (!!error) ? reject(error) : resolve(checkouts);
            });
        });
    };
    CheckoutService.prototype.findById = function (id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return self.Checkout.findById(id, function (error, checkout) {
                return (!!error) ? reject(error) : resolve(checkout);
            });
        });
    };
    CheckoutService.prototype.insert = function (checkoutData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var checkout = new self.Checkout(checkoutData);
            checkout.save(function (error) { return !!error ? reject(error) : resolve(checkout); });
        });
    };
    CheckoutService.prototype.update = function (id, checkoutData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.Checkout.findByIdAndUpdate(id, checkoutData, function (error, checkout) { return !!error ? reject(error) : resolve(checkout); });
        });
    };
    CheckoutService.prototype.delete = function (id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return self.Checkout.findByIdAndRemove(id, function (error, checkout) { return !!error ? reject(error) : resolve(checkout); });
        });
    };
    CheckoutService.prototype.getXML = function (checkout) {
        return new Promise(function (resolve, reject) {
            try {
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
                resolve(xml);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    return CheckoutService;
})();
exports.CheckoutService = CheckoutService;