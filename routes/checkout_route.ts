"use strict";

import * as express from "express";
import * as bodyParser from "body-parser";
import {ICheckout} from "../models/checkout_model";
import {IUser} from "../models/user_model";
import {ICheckoutService, CheckoutService} from "../services/checkout_service";
import {IUserService, UserService} from "../services/user_service";

export var Router = (server: express.Router) => {
    var router: express.Router = express.Router(server);

    router
        .route("/")
        .get(bodyParser.urlencoded({ extended: true }),
        (request: express.Request, response: express.Response, next: Function) => {
            var filter: any = request.body;
            var userService: IUserService = new UserService();
            userService.findById(request.params.userId)
                .then((user: IUser) => {
                var checkoutService: ICheckoutService = new CheckoutService(user);
                return checkoutService.find(filter);
            })
                .then((checkouts: Array<ICheckout>) => response.status(200).json(checkouts))
                .catch((error: any) => next(error));
        })
        .post(bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var checkoutData: any = request.body;
            var userService: IUserService = new UserService();
            userService.findById(request.params.userId)
                .then((user: IUser) => {
                var checkoutService: ICheckoutService = new CheckoutService(user);
                return checkoutService.insert(checkoutData);
            })
                .then((checkout: ICheckout) => response.status(201).json(checkout))
                .catch((error: any) => next(error));
        });

    router
        .route("/:id")
        .get(bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var userService: IUserService = new UserService();
            userService.findById(request.params.userId)
                .then((user: IUser) => {
                var checkoutService: ICheckoutService = new CheckoutService(user);
                return checkoutService.findById(request.params.id);
            })
                .then((checkout: ICheckout) => response.status(200).json(checkout))
                .catch((error: any) => next(error));
        })
        .put(bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var checkoutData: any = request.body;
            var userService: IUserService = new UserService();
            userService.findById(request.params.userId)
                .then((user: IUser) => {
                var checkoutService: ICheckoutService = new CheckoutService(user);
                return checkoutService.update(request.params.id, checkoutData);
            })
                .then((checkout: ICheckout) => response.status(200).json(checkout))
                .catch((error: any) => next(error));
        })
        .delete((request: express.Request, response: express.Response, next: Function) => {
        var userService: IUserService = new UserService();
        userService.findById(request.params.userId)
            .then((user: IUser) => {
            var checkoutService: ICheckoutService = new CheckoutService(user);
            return checkoutService.delete(request.params.id);
        })
            .then((checkout: ICheckout) => response.status(204).json(checkout))
            .catch((error: any) => next(error));
    });

    return router;
};
