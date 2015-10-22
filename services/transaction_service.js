"use strict";
var transaction_model_1 = require("../models/transaction_model");
var sender_service_1 = require("./sender_service");
var urlpagseguro_enum_1 = require("../models/urlpagseguro_enum");
var request = require("request");
var xml2json = require("xml2json");
var TransactionService = (function () {
    function TransactionService(user) {
        this.user = user;
        this.senderService = new sender_service_1.SenderService(this.user);
    }
    TransactionService.prototype.find = function (filtro) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return transaction_model_1.Transaction.find(filtro, function (error, transactions) {
                return (!!error) ? reject(error) : resolve(transactions);
            });
        });
    };
    TransactionService.prototype.findById = function (id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            transaction_model_1.Transaction.find({ code: id }, function (error, transactions) {
                if (!!error) {
                    return reject(error);
                }
                if (!!transactions.length) {
                    return resolve(transactions[0]);
                }
                var urlTransaction = process.env.NODE_ENV === "production" ? urlpagseguro_enum_1.EnumURLPagSeguro.transaction_production : urlpagseguro_enum_1.EnumURLPagSeguro.transaction_development;
                var requestOptions = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/xml; charset=UTF-8"
                    },
                    uri: urlTransaction + "/" + id + "?email=" + self.user.email + "&token=" + self.user.token
                };
                request(requestOptions, function (error, response, body) {
                    if (!!error) {
                        return reject(error);
                    }
                    var transaction = JSON.parse(xml2json.toJson(body)).transaction;
                    self.senderService.find({
                        email: transaction.sender.email
                    })
                        .then(function (senders) {
                        transaction.sender = senders[0];
                        resolve(transaction);
                    });
                });
            });
        });
    };
    TransactionService.prototype.insert = function (transactionData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var transaction = new transaction_model_1.Transaction(transactionData);
            transaction.save(function (error) { return !!error ? reject(error) : resolve(transaction); });
        });
    };
    TransactionService.prototype.update = function (id, transactionData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            transaction_model_1.Transaction.findByIdAndUpdate(id, transactionData, function (error, transaction) { return !!error ? reject(error) : resolve(transaction); });
        });
    };
    TransactionService.prototype.delete = function (id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return transaction_model_1.Transaction.findByIdAndRemove(id, function (error, transaction) { return !!error ? reject(error) : resolve(transaction); });
        });
    };
    return TransactionService;
})();
exports.TransactionService = TransactionService;
