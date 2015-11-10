"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var checkout_service_1 = require("../services/checkout_service");
var user_service_1 = require("../services/user_service");
exports.Router = function (server) {
    var router = express.Router(server);
    router
        .route("/:userId")
        .get(bodyParser.urlencoded({ extended: true }), function (request, response, next) {
        var filter = request.body;
        var userService = new user_service_1.UserService();
        userService.findById(request.params.userId)
            .then(function (user) {
            var checkoutService = new checkout_service_1.CheckoutService(user);
            return checkoutService.find(filter);
        })
            .then(function (checkouts) { return response.status(200).json(checkouts); })
            .catch(function (error) { return next(error); });
    })
        .post(bodyParser.json({}), function (request, response, next) {
        var checkoutData = request.body;
        var userService = new user_service_1.UserService();
        userService.findById(request.params.userId)
            .then(function (user) {
            var checkoutService = new checkout_service_1.CheckoutService(user);
            return checkoutService.insert(checkoutData);
        })
            .then(function (checkout) { return response.status(201).json(checkout); })
            .catch(function (error) { return next(error); });
    });
    router
        .route("/:userId/:id")
        .get(bodyParser.json({}), function (request, response, next) {
        var userService = new user_service_1.UserService();
        userService.findById(request.params.userId)
            .then(function (user) {
            var checkoutService = new checkout_service_1.CheckoutService(user);
            return checkoutService.findById(request.params.id);
        })
            .then(function (checkout) { return response.status(200).json(checkout); })
            .catch(function (error) { return next(error); });
    })
        .put(bodyParser.json({}), function (request, response, next) {
        var checkoutData = request.body;
        var userService = new user_service_1.UserService();
        userService.findById(request.params.userId)
            .then(function (user) {
            var checkoutService = new checkout_service_1.CheckoutService(user);
            return checkoutService.update(request.params.id, checkoutData);
        })
            .then(function (checkout) { return response.status(200).json(checkout); })
            .catch(function (error) { return next(error); });
    })
        .delete(function (request, response, next) {
        var userService = new user_service_1.UserService();
        userService.findById(request.params.userId)
            .then(function (user) {
            var checkoutService = new checkout_service_1.CheckoutService(user);
            return checkoutService.delete(request.params.id);
        })
            .then(function (checkout) { return response.status(204).json(checkout); })
            .catch(function (error) { return next(error); });
    });
    return router;
};
