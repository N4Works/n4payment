"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var checkout_service_1 = require("../services/checkout_service");
exports.Router = function (server) {
    var router = express.Router(server);
    router
        .route("/")
        .get(bodyParser.urlencoded({ extended: true }), function (request, response, next) {
        var filter = request.body;
        var checkoutService = new checkout_service_1.CheckoutService(request.user);
        checkoutService.find(filter)
            .then(function (checkouts) { return response.status(200).json(checkouts); })
            .catch(function (error) { return next(error); });
    })
        .post(function (request, response, next) {
        var checkoutData = request.body;
        var checkoutService = new checkout_service_1.CheckoutService(request.user);
        checkoutService.insert(checkoutData)
            .then(function (checkout) { return response.status(201).json(checkout); })
            .catch(function (error) { return next(error); });
    });
    router
        .route("/:id")
        .get(function (request, response, next) {
        var checkoutService = new checkout_service_1.CheckoutService(request.user);
        checkoutService.findById(request.params.id)
            .then(function (checkout) { return response.status(200).json(checkout); })
            .catch(function (error) { return next(error); });
    })
        .put(function (request, response, next) {
        var checkoutData = request.body;
        var checkoutService = new checkout_service_1.CheckoutService(request.user);
        checkoutService.update(request.params.id, checkoutData)
            .then(function (checkout) { return response.status(200).json(checkout); })
            .catch(function (error) { return next(error); });
    })
        .delete(function (request, response, next) {
        var checkoutService = new checkout_service_1.CheckoutService(request.user);
        checkoutService.delete(request.params.id)
            .then(function (checkout) { return response.status(204).json(checkout); })
            .catch(function (error) { return next(error); });
    });
    return router;
};
