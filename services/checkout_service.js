"use strict";
var checkout_model_1 = require("../models/checkout_model");
var sender_service_1 = require("./sender_service");
var jsontoxml = require("jsontoxml");
var CheckoutService = (function () {
    function CheckoutService(user) {
        this.user = user;
        this.senderService = new sender_service_1.SenderService();
    }
    CheckoutService.prototype.find = function (filter) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return checkout_model_1.Checkout.find(filter)
                .populate("receiver")
                .populate("sender")
                .exec(function (error, checkouts) {
                return (!!error) ? reject(error) : resolve(checkouts);
            });
        });
    };
    CheckoutService.prototype.findById = function (id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return checkout_model_1.Checkout.findById(id)
                .populate("receiver")
                .populate("sender")
                .populate("items")
                .exec(function (error, checkout) {
                return (!!error) ? reject(error) : resolve(checkout);
            });
        });
    };
    CheckoutService.prototype.insert = function (checkoutData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var checkout = new checkout_model_1.Checkout(checkoutData);
            checkout.receiver = self.user;
            self.senderService.findByEmail(checkoutData.sender.email)
                .then(function (sender) {
                checkout.sender = sender;
                checkout.save(function (error) { return !!error ? reject(error) : resolve(checkout); });
            })
                .catch(function (e) { return reject(e); });
        });
    };
    CheckoutService.prototype.update = function (id, checkoutData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            checkout_model_1.Checkout.findByIdAndUpdate(id, {
                $set: checkoutData
            }, function (error, checkout) { return !!error ? reject(error) : resolve(checkout); });
        });
    };
    CheckoutService.prototype.delete = function (id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return checkout_model_1.Checkout.findByIdAndRemove(id)
                .populate("receiver")
                .populate("sender")
                .populate("items")
                .exec(function (error, checkout) { return !!error ? reject(error) : resolve(checkout); });
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
                var xml = jsontoxml(checkout_model_1.Checkout.toPagSeguro(checkout), options);
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
