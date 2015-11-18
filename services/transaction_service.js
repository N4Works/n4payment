"use strict";
var transaction_model_1 = require("../models/transaction_model");
var urlpagseguro_enum_1 = require("../models/urlpagseguro_enum");
var request = require("request");
var xml2json = require("xml2json");
var TransactionService = (function () {
    function TransactionService(user) {
        this.user = user;
    }
    TransactionService.prototype.find = function (filtro) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return transaction_model_1.Transaction.find(filtro, function (error, transactions) {
                return (!!error) ? reject(error) : resolve(transactions);
            });
        });
    };
    TransactionService.prototype.findByCode = function (code) {
        return new Promise(function (resolve, reject) {
            transaction_model_1.Transaction.findOne({ code: code }, function (error, t) { return !!error ? reject(error) : resolve(t); });
        });
    };
    TransactionService.prototype.findByCodeAndSave = function (code) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var urlTransaction = process.env.NODE_ENV === "production" ? urlpagseguro_enum_1.EnumURLPagSeguro.transaction_production : urlpagseguro_enum_1.EnumURLPagSeguro.transaction_development;
            var requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/xml; charset=UTF-8"
                },
                uri: urlTransaction + "/" + code + "?email=" + self.user.email + "&token=" + self.user.token
            };
            request(requestOptions, function (error, response, body) {
                if (!!error) {
                    return reject(error);
                }
                self.saveTransaction(body, resolve, reject);
            });
        });
    };
    TransactionService.prototype.findByNotificationCodeAndSave = function (notificationCode) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var urlTransaction = process.env.NODE_ENV === "production" ? urlpagseguro_enum_1.EnumURLPagSeguro.transaction_notification_production : urlpagseguro_enum_1.EnumURLPagSeguro.transaction_notification_development;
            var requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/xml; charset=UTF-8"
                },
                uri: urlTransaction + "/" + notificationCode + "?email=" + self.user.email + "&token=" + self.user.token
            };
            request(requestOptions, function (error, response, body) {
                if (!!error) {
                    return reject(error);
                }
                self.saveTransaction(body, resolve, reject);
            });
        });
    };
    TransactionService.prototype.getErrors = function (data) {
        var errors = new Array();
        if (!!data.errors) {
            errors.push("Foram encontrados os seguintes problemas na requisição:");
            data.errors = data.errors.error instanceof Array ? data.errors.error : [data.errors.error];
            errors = errors.concat(data.errors.map(function (e) { return ("  - " + e.code + " -> " + e.message + ";"); }));
        }
        return errors.join("\n");
    };
    TransactionService.prototype.saveTransaction = function (body, resolve, reject) {
        var self = this;
        var data = xml2json.toJson(body, { object: true });
        var errors = this.getErrors(data);
        if (!!errors) {
            return reject(errors);
        }
        data = data.transaction;
        data.items = data.items.item;
        self.findByCode(data.code)
            .then(function (t) {
            if (!!t) {
                return transaction_model_1.Transaction.update({
                    code: t.code
                }, {
                    $set: data
                }, function (error) { return error ? reject(error) : resolve(); });
            }
            t = new transaction_model_1.Transaction(data);
            t.save(function (error) { return error ? reject(error) : resolve(); });
        }).catch(function (error) { return reject(error); });
    };
    return TransactionService;
})();
exports.TransactionService = TransactionService;
