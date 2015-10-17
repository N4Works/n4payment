"use strict";
var express = require("express");
var bodyParser = require("body-parser");
exports.Router = function (server) {
    var router = express.Router(server);
    router
        .route("/")
        .get(bodyParser.json({}), function (request, response) {
    })
        .post(bodyParser.json({}), function (request, response) {
    });
    router
        .route("/:id")
        .get(bodyParser.json({}), function (request, response) {
    })
        .put(bodyParser.json({}), function (request, response) {
    })
        .delete(function (request, response) {
    });
    return router;
};
