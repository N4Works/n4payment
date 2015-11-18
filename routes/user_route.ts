"use strict";

import express = require("express");
import bodyParser = require("body-parser");
import {IUser} from "../models/user_model";
import {IUserService, UserService} from "../services/user_service";

export var Router = (server: express.Router) => {
    var router: express.Router = express.Router(server);
    var userService: IUserService = new UserService();

    router
        .route("/")
        .get(bodyParser.urlencoded({extended: true}),
        (request: express.Request, response: express.Response, next: Function) => {
            var filter:any = request.body;
            userService.find(filter)
                .then((users:Array<IUser>) => response.status(200).json(users))
                .catch((error:any) => next(error));
        })
        .post((request: express.Request, response: express.Response, next: Function) => {
            var userData:any = request.body;
            userService.insert(userData)
                .then((user:IUser) => response.status(201).json(user))
                .catch((error:any) => next(error));
        });

    router
        .route("/:id")
        .get((request: express.Request, response: express.Response, next: Function) => {
            userService.findById(request.params.id)
                .then((user:IUser) => response.status(200).json(user))
                .catch((error:any) => next(error));
        })
        .put((request: express.Request, response: express.Response, next: Function) => {
            var userData:any = request.body;
            userService.update(request.params.id, userData)
                .then((user:IUser) => response.status(200).json(user))
                .catch((error:any) => next(error));
        })
        .delete((request: express.Request, response: express.Response, next: Function) => {
            userService.delete(request.params.id)
                .then((user:IUser) => response.status(204).json(user))
                .catch((error:any) => next(error));
        });

    return router;
};
