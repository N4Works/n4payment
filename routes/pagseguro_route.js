"use strict";
import * as express from "express";
import * as bodyParser from "body-parser";
export var Router = (server) => {
    var router = express.Router(server);
    router
        .route("/")
        .get(bodyParser.json({}), (request, response) => {
    })
        .post(bodyParser.json({}), (request, response) => {
    });
    router
        .route("/:id")
        .get(bodyParser.json({}), (request, response) => {
    })
        .put(bodyParser.json({}), (request, response) => {
    })
        .delete((request, response) => {
    });
    return router;
};
