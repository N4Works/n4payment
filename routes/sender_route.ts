"use strict";

import * as express from "express";
import * as bodyParser from "body-parser";
import {ISender} from "../models/sender_model";
import {ISenderService, SenderService} from "../services/sender_service";

export var Router = (server: express.Application) => {
    var router: express.Router = express.Router(server);
    var senderService: ISenderService = new SenderService();

    router
        .route("/")
        .get(bodyParser.urlencoded({extended: true}),
        (request: express.Request, response: express.Response, next: Function) => {
            var filter:any = request.body;
            senderService.find(filter)
                .then((senders:Array<ISender>) => response.status(200).json(senders))
                .catch((error:any) => next(error));
        })
        .post(bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var senderData:any = request.body;
            senderService.insert(senderData)
                .then((sender:ISender) => response.status(201).json(sender))
                .catch((error:any) => next(error));
        });

    router
        .route("/:id")
        .get(bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            senderService.findById(request.params.id)
                .then((sender:ISender) => response.status(200).json(sender))
                .catch((error:any) => next(error));
        })
        .put(bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var senderData:any = request.body;
            senderService.update(request.params.id, senderData)
                .then((sender:ISender) => response.status(200).json(sender))
                .catch((error:any) => next(error));
        })
        .delete((request: express.Request, response: express.Response, next: Function) => {
            senderService.delete(request.params.id)
                .then((sender:ISender) => response.status(204).json(sender))
                .catch((error:any) => next(error));
        });

    return router;
};
