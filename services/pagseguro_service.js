"use strict";
var urlpagseguro_enum_1 = require("../models/urlpagseguro_enum");
var checkout_service_1 = require("../services/checkout_service");
var nodemailer = require("nodemailer");
var request = require("request");
var xml2json = require("xml2json");
var PagSeguroService = (function () {
    function PagSeguroService(user) {
        this.user = user;
    }
    PagSeguroService.prototype.sendPayment = function (checkout) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var checkoutService = new checkout_service_1.CheckoutService(self.user);
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
                    checkout.sentDate = new Date();
                    checkout.save();
                    var checkoutResponse = data.checkout;
                    var urlPayment = process.env.NODE_ENV === "production" ? urlpagseguro_enum_1.EnumURLPagSeguro.payment_production : urlpagseguro_enum_1.EnumURLPagSeguro.payment_development;
                    var redirectURL = urlPayment + "?code=" + checkoutResponse.code;
                    var transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: "n4payment",
                            pass: "omtx txtk rbgh cjnu"
                        }
                    });
                    transporter.sendMail({
                        to: checkout.sender.email,
                        subject: "Pagamento para " + (checkout.receiver.name || "n4payment"),
                        text: redirectURL
                    }, function (error, response) {
                        if (error) {
                            return reject("Ocorreu o seguinte problema ao enviar e-mail ao cliente " + checkout.sender.name + ": " + error + ".");
                        }
                        return resolve(redirectURL);
                    });
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
