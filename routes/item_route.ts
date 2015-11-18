"use strict";

import express = require("express");
import bodyParser = require("body-parser");
import {IItem} from "../models/item_model";
import {IUser} from "../models/user_model";
import {IItemService, ItemService} from "../services/item_service";

export var Router = (server: express.Router) => {
    var router: express.Router = express.Router(server);

    router
        .route("/")
        .get(bodyParser.urlencoded({ extended: true }),
        (request: express.Request, response: express.Response, next: Function) => {
            var filter: any = request.body;
            var itemService: IItemService = new ItemService(request.user);
            itemService.find(filter)
                .then((items: Array<IItem>) => response.status(200).json(items))
                .catch((error: any) => next(error));
        })
        .post((request: express.Request, response: express.Response, next: Function) => {
            var itemData: any = request.body;
            var itemService: IItemService = new ItemService(request.user);
            itemService.insert(itemData)
                .then((item: IItem) => response.status(201).json(item))
                .catch((error: any) => next(error));
        });

    router
        .route("/:_id")
        .get((request: express.Request, response: express.Response, next: Function) => {
            var itemService: IItemService = new ItemService(request.user);
            itemService.findById(request.params._id)
                .then((item: IItem) => response.status(200).json(item))
                .catch((error: any) => next(error));
        })
        .put((request: express.Request, response: express.Response, next: Function) => {
            var itemData: any = request.body;
            var itemService: IItemService = new ItemService(request.user);
            itemService.update(request.params._id, itemData)
                .then((item: IItem) => response.status(200).json(item))
                .catch((error: any) => next(error));
        })
        .delete((request: express.Request, response: express.Response, next: Function) => {
        var itemService: IItemService = new ItemService(request.user);
        itemService.delete(request.params._id)
            .then((item: IItem) => response.status(204).json(item))
            .catch((error: any) => next(error));
    });

    return router;
};
