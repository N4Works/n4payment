"use strict";

import express = require("express");
import bodyParser = require("body-parser");
import {ICheckout} from "../models/checkout_model";
import {ICheckoutService, CheckoutService} from "../services/checkout_service";

export var Router = (server: express.Router) => {
    var router: express.Router = express.Router(server);

    router
        .route("/")
        .get(bodyParser.urlencoded({ extended: true }),
        (request: express.Request, response: express.Response, next: Function) => {
            var filter: any = request.body;
            var checkoutService: ICheckoutService = new CheckoutService(request.user);
            checkoutService.find(filter)
                .then((checkouts: Array<ICheckout>) => response.status(200).json(checkouts))
                .catch((error: any) => next(error));
        })
        .post((request: express.Request, response: express.Response, next: Function) => {
            var checkoutData: any = request.body;
            var checkoutService: ICheckoutService = new CheckoutService(request.user);
            checkoutService.insert(checkoutData)
                .then((checkout: ICheckout) => response.status(201).json(checkout))
                .catch((error: any) => next(error));
        });

    router
        .route("/:id")
        .get((request: express.Request, response: express.Response, next: Function) => {
            var checkoutService: ICheckoutService = new CheckoutService(request.user);
            checkoutService.findById(request.params.id)
                .then((checkout: ICheckout) => response.status(200).json(checkout))
                .catch((error: any) => next(error));
        })
        .put((request: express.Request, response: express.Response, next: Function) => {
            var checkoutData: any = request.body;
            var checkoutService: ICheckoutService = new CheckoutService(request.user);
            checkoutService.update(request.params.id, checkoutData)
                .then((checkout: ICheckout) => response.status(200).json(checkout))
                .catch((error: any) => next(error));
        })
        .delete((request: express.Request, response: express.Response, next: Function) => {
        var checkoutService: ICheckoutService = new CheckoutService(request.user);
        checkoutService.delete(request.params.id)
            .then((checkout: ICheckout) => response.status(204).json(checkout))
            .catch((error: any) => next(error));
    });

    return router;
};
