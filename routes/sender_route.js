"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var sender_service_1 = require("../services/sender_service");
exports.Router = function (server) {
    var router = express.Router(server);
    var senderService = new sender_service_1.SenderService();
    router
        .route("/")
        .get(bodyParser.urlencoded({ extended: true }), function (request, response, next) {
        var filter = request.body;
        senderService.find(filter)
            .then(function (senders) { return response.status(200).json(senders); })
            .catch(function (error) { return next(error); });
    })
        .post(bodyParser.json({}), function (request, response, next) {
        var senderData = request.body;
        senderService.insert(senderData)
            .then(function (sender) { return response.status(201).json(sender); })
            .catch(function (error) { return next(error); });
    });
    router
        .route("/:id")
        .get(bodyParser.json({}), function (request, response, next) {
        senderService.findById(request.params.id)
            .then(function (sender) { return response.status(200).json(sender); })
            .catch(function (error) { return next(error); });
    })
        .put(bodyParser.json({}), function (request, response, next) {
        var senderData = request.body;
        senderService.update(request.params.id, senderData)
            .then(function (sender) { return response.status(200).json(sender); })
            .catch(function (error) { return next(error); });
    })
        .delete(function (request, response, next) {
        senderService.delete(request.params.id)
            .then(function (sender) { return response.status(204).json(sender); })
            .catch(function (error) { return next(error); });
    });
    return router;
};
