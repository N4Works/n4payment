"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var item_service_1 = require("../services/item_service");
exports.Router = function (server) {
    var router = express.Router(server);
    router
        .route("/")
        .get(bodyParser.urlencoded({ extended: true }), function (request, response, next) {
        var filter = request.body;
        var itemService = new item_service_1.ItemService(request.user);
        itemService.find(filter)
            .then(function (items) { return response.status(200).json(items); })
            .catch(function (error) { return next(error); });
    })
        .post(function (request, response, next) {
        var itemData = request.body;
        var itemService = new item_service_1.ItemService(request.user);
        itemService.insert(itemData)
            .then(function (item) { return response.status(201).json(item); })
            .catch(function (error) { return next(error); });
    });
    router
        .route("/:_id")
        .get(function (request, response, next) {
        var itemService = new item_service_1.ItemService(request.user);
        itemService.findById(request.params._id)
            .then(function (item) { return response.status(200).json(item); })
            .catch(function (error) { return next(error); });
    })
        .put(function (request, response, next) {
        var itemData = request.body;
        var itemService = new item_service_1.ItemService(request.user);
        itemService.update(request.params._id, itemData)
            .then(function (item) { return response.status(200).json(item); })
            .catch(function (error) { return next(error); });
    })
        .delete(function (request, response, next) {
        var itemService = new item_service_1.ItemService(request.user);
        itemService.delete(request.params._id)
            .then(function (item) { return response.status(204).json(item); })
            .catch(function (error) { return next(error); });
    });
    return router;
};
