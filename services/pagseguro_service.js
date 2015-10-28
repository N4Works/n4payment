"use strict";
var urlpagseguro_enum_1 = require("../models/urlpagseguro_enum");
var checkout_service_1 = require("../services/checkout_service");
var request = require("request");
var xml2json = require("xml2json");
var PagSeguroService = (function () {
    function PagSeguroService(user) {
        this.user = user;
    }
    PagSeguroService.prototype.sendPayment = function (checkout) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var checkoutService = new checkout_service_1.CheckoutService();
            checkoutService.getXML(checkout)
                .then(function (xml) {
                var urlCheckout = process.env.NODE_ENV === "production" ? urlpagseguro_enum_1.EnumURLPagSeguro.checkout_production : urlpagseguro_enum_1.EnumURLPagSeguro.checkout_development;
                var requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/xml; charset=UTF-8"
                    },
                    uri: urlCheckout + "?email=" + self.user.email + "&token=" + self.user.token,
                    body: xml
                };
                request(requestOptions, function (error, response, body) {
                    if (!!error) {
                        return reject(error);
                    }
                    var data = xml2json.toJson(body, { object: true });
                    var errors = PagSeguroService.getErrors(data);
                    if (!!errors) {
                        return reject(errors);
                    }
                    var checkout = data.checkout;
                    var urlPayment = process.env.NODE_ENV === "production" ? urlpagseguro_enum_1.EnumURLPagSeguro.payment_production : urlpagseguro_enum_1.EnumURLPagSeguro.payment_development;
                    return resolve(urlPayment + "?code=" + checkout.code);
                });
            })
                .catch(function (e) { return reject(e); });
        });
    };
    PagSeguroService.prototype.getErrors = function (data) {
        return PagSeguroService.getErrors(data);
    };
    PagSeguroService.getErrors = function (data) {
        var errors = new Array();
        if (!!data.errors) {
            errors.push("Foram encontrados os seguintes problemas na requisição:");
            data.errors = data.errors.error instanceof Array ? data.errors.error : [data.errors.error];
            errors = errors.concat(data.errors.map(function (e) { return ("  - " + e.code + " -> " + e.message + ";"); }));
        }
        return errors.join("\n");
    };
    return PagSeguroService;
})();
exports.PagSeguroService = PagSeguroService;
