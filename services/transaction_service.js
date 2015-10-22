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
    TransactionService.prototype.findByCodeAndInsert = function (code) {
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
                var data = JSON.parse(xml2json.toJson(body)).transaction;
                data.items = data.items.item;
                var transaction = new transaction_model_1.Transaction(data);
                transaction.save(function (error) { return error ? reject(error) : resolve(transaction); });
            });
        });
    };
    return TransactionService;
})();
exports.TransactionService = TransactionService;
