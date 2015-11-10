"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var xmlparser = require("express-xml-bodyparser");
var user_service_1 = require("../services/user_service");
var transaction_service_1 = require("../services/transaction_service");
var checkout_service_1 = require("../services/checkout_service");
var pagseguro_service_1 = require("../services/pagseguro_service");
exports.Router = function (server) {
    var router = express.Router(server);
    router
        .route("/notifications/:userId")
        .post(cors({
        origin: "pagseguro.uol.com.br"
    }), bodyParser.urlencoded({ extended: true }), xmlparser(), function (request, response, next) {
        var notification = request.body;
        var service = new user_service_1.UserService();
        service.findById(request.params.userId)
            .then(function (user) {
            var transactionService = new transaction_service_1.TransactionService(user);
            return transactionService.findByNotificationCodeAndSave(notification.notificationCode);
        })
            .then(function () { return response.status(200).end(); })
            .catch(function (error) { return next(error); });
    });
    router
        .route("/notifications/:userId/:notificationCode")
        .get(bodyParser.json({}), function (request, response, next) {
        var service = new user_service_1.UserService();
        service.findById(request.params.userId)
            .then(function (user) {
            var transactionService = new transaction_service_1.TransactionService(user);
            return transactionService.findByNotificationCodeAndSave(request.params.notificationCode);
        })
            .then(function () { return response.status(200).end(); })
            .catch(function (error) { return next(error); });
    });
    router
        .route("/transactions/:userId")
        .get(bodyParser.json({}), function (request, response, next) {
        var service = new user_service_1.UserService();
        service.findById(request.params.userId)
            .then(function (user) {
            var transactionService = new transaction_service_1.TransactionService(user);
            return transactionService.find(null);
        })
            .then(function (transactions) { return response.status(200).json(transactions); })
            .catch(function (error) { return next(error); });
    });
    router
        .route("/transactions/:userId/:id")
        .get(bodyParser.json({}), function (request, response, next) {
        var service = new user_service_1.UserService();
        service.findById(request.params.userId)
            .then(function (user) {
            var transactionService = new transaction_service_1.TransactionService(user);
            return transactionService.findByCodeAndSave(request.params.id);
        })
            .then(function () { return response.status(200).end(); })
            .catch(function (error) { return next(error); });
    });
    router
        .route("/payments/:userId/:id")
        .post(bodyParser.json({}), function (request, response, next) {
        var service = new user_service_1.UserService();
        var checkoutService;
        var pagseguroService;
        service.findById(request.params.userId)
            .then(function (user) {
            checkoutService = new checkout_service_1.CheckoutService(user);
            pagseguroService = new pagseguro_service_1.PagSeguroService(user);
            return checkoutService.findById(request.params.id);
        })
            .then(function (checkout) {
            return pagseguroService.sendPayment(checkout);
        })
            .then(function (redirectURL) { return response.status(201).json({ redirectURL: redirectURL }); })
            .catch(function (error) { return next(error); });
    });
    return router;
};
