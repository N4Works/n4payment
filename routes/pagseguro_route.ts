"use strict";

import express = require("express");
import bodyParser = require("body-parser");
import cors = require("cors");
var xmlparser = require("express-xml-bodyparser");
import {IUserService, UserService} from "../services/user_service";
import {INotification} from "../models/notification_model";
import {ICheckout, Checkout, ICheckoutResponse} from "../models/checkout_model";
import {ITransaction} from "../models/transaction_model";
import {ITransactionService, TransactionService} from "../services/transaction_service";
import {ICheckoutService, CheckoutService} from "../services/checkout_service";
import {IPagSeguroSevice, PagSeguroService} from "../services/pagseguro_service";
import {EnumShipping} from "../models/shipping_model";
import {IUser} from "../models/user_model";
import login from "../middlewares/login_middleware";

export var Router = (server: express.Router) => {
    var router: express.Router = express.Router(server);

    router
        .route("/notifications/:userId")
        .post(cors({ origin: "pagseguro.uol.com.br" }),
        bodyParser.urlencoded({ extended: true }),
        xmlparser(),
        (request: express.Request, response: express.Response, next: Function) => {
            var notification: INotification = request.body;
            var service: IUserService = new UserService();
            service.findById(request.params.userId)
                .then((user: IUser) => {
                var transactionService: ITransactionService = new TransactionService(user);
                return transactionService.findByNotificationCodeAndSave(notification.notificationCode);
            })
                .then(() => response.status(200).end())
                .catch(error => next(error));
        });

    router
        .route("/notifications/:notificationCode")
        .get(login, bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var transactionService: ITransactionService = new TransactionService(request.user);
            transactionService.findByNotificationCodeAndSave(request.params.notificationCode)
                .then(() => response.status(200).end())
                .catch(error => next(error));
        });

    router
        .route("/transactions")
        .get(login, bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var transactionService: ITransactionService = new TransactionService(request.user);
            transactionService.find(null)
                .then((transactions: Array<ITransaction>) => response.status(200).json(transactions))
                .catch(error => next(error));
        });

    router
        .route("/transactions/:id")
        .get(login, bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var transactionService: ITransactionService = new TransactionService(request.user);
            transactionService.findByCodeAndSave(request.params.id)
                .then(() => response.status(200).end())
                .catch(error => next(error));
        });

    router
        .route("/payments/:id")
        .post(login, bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var checkoutService: ICheckoutService = new CheckoutService(request.user);
            var pagseguroService: IPagSeguroSevice = new PagSeguroService(request.user);
            checkoutService.findById(request.params.id)
                .then((checkout: ICheckout) => {
                return pagseguroService.sendPayment(checkout);
            })
                .then((redirectURL: string) => response.status(201).json({ redirectURL: redirectURL }))
                .catch(error => next(error));
        });

    return router;
};
