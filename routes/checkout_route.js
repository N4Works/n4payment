"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var checkout_service_1 = require("../services/checkout_service");
exports.Router = function (server) {
    var router = express.Router(server);
    var checkoutService = new checkout_service_1.CheckoutService();
    router
        .route("/")
        .get(bodyParser.urlencoded({ extended: true }), function (request, response, next) {
        var filter = request.body;
        checkoutService.find(filter)
            .then(function (checkouts) { return response.status(200).json(checkouts); })
            .catch(function (error) { return next(error); });
    })
        .post(bodyParser.json({}), function (request, response, next) {
        var checkoutData = request.body;
        checkoutService.insert(checkoutData)
            .then(function (checkout) { return response.status(201).json(checkout); })
            .catch(function (error) { return next(error); });
    });
    router
        .route("/:id")
        .get(bodyParser.json({}), function (request, response, next) {
        checkoutService.findById(request.params.id)
            .then(function (checkout) { return response.status(200).json(checkout); })
            .catch(function (error) { return next(error); });
    })
        .put(bodyParser.json({}), function (request, response, next) {
        var checkoutData = request.body;
        checkoutService.update(request.params.id, checkoutData)
            .then(function (checkout) { return response.status(200).json(checkout); })
            .catch(function (error) { return next(error); });
    })
        .delete(function (request, response, next) {
        checkoutService.delete(request.params.id)
            .then(function (checkout) { return response.status(204).json(checkout); })
            .catch(function (error) { return next(error); });
    });
    return router;
};
