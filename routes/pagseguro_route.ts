"use strict";

import * as express from "express";
import * as bodyParser from "body-parser";
import * as psBuilder from "../services/pagseguro_builder";

export var Router = (server: express.Router) => {
    var router: express.Router = express.Router(server);
    router
        .route("/")
        .get(bodyParser.json({}),
        (request: express.Request, response: express.Response) => {
        })
        .post(bodyParser.json({}),
        (request: express.Request, response: express.Response) => {
        });

    router
        .route("/:id")
        .get(bodyParser.json({}),
        (request: express.Request, response: express.Response) => {

        })
        .put(bodyParser.json({}),
        (request: express.Request, response: express.Response) => {

        })
        .delete((request: express.Request, response: express.Response) => {

        });

    return router;
};
