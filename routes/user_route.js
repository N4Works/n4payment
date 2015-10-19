"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var user_service_1 = require("../services/user_service");
exports.Router = function (server) {
    var router = express.Router(server);
    var userService = new user_service_1.UserService();
    router
        .route("/")
        .get(bodyParser.urlencoded({ extended: true }), function (request, response, next) {
        var filter = request.body;
        userService.find(filter)
            .then(function (users) { return response.status(200).json(users); })
            .catch(function (error) { return next(error); });
    })
        .post(bodyParser.json({}), function (request, response, next) {
        var userData = request.body;
        userService.insert(userData)
            .then(function (user) { return response.status(201).json(user); })
            .catch(function (error) { return next(error); });
    });
    router
        .route("/:id")
        .get(bodyParser.json({}), function (request, response, next) {
        userService.findById(request.params.id)
            .then(function (user) { return response.status(200).json(user); })
            .catch(function (error) { return next(error); });
    })
        .put(bodyParser.json({}), function (request, response, next) {
        var userData = request.body;
        userService.update(request.params.id, userData)
            .then(function (user) { return response.status(200).json(user); })
            .catch(function (error) { return next(error); });
    })
        .delete(function (request, response, next) {
        userService.delete(request.params.id)
            .then(function (user) { return response.status(204).json(user); })
            .catch(function (error) { return next(error); });
    });
    return router;
};
