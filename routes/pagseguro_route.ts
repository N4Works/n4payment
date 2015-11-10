"use strict";

import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
var xmlparser = require("express-xml-bodyparser");
import {IUserService} from "../services/user_service";
import {UserService} from "../services/user_service";
import {INotification} from "../models/notification_model";
import {ICheckout} from "../models/checkout_model";
import {Checkout} from "../models/checkout_model";
import {ITransaction} from "../models/transaction_model";
import {ITransactionService} from "../services/transaction_service";
import {TransactionService} from "../services/transaction_service";
import {ICheckoutService} from "../services/checkout_service";
import {CheckoutService} from "../services/checkout_service";
import {IPagSeguroSevice} from "../services/pagseguro_service";
import {PagSeguroService} from "../services/pagseguro_service";
import {EnumShipping} from "../models/shipping_model";
import {ICheckoutResponse} from "../models/checkout_model";
import {IUser} from "../models/user_model";
import {IPaymentBuilder} from "../builders/payment_builder";
import {PaymentBuilder} from "../builders/payment_builder";

export var Router = (server: express.Router) => {
    var router: express.Router = express.Router(server);

    router
        .route("/notifications/:userId")
        .post(cors({
            origin: "pagseguro.uol.com.br"
        }), bodyParser.urlencoded({ extended: true }), xmlparser(),
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
        .route("/notifications/:userId/:notificationCode")
        .get(bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var service: IUserService = new UserService();
            service.findById(request.params.userId)
                .then((user: IUser) => {
                    var transactionService: ITransactionService = new TransactionService(user);
                    return transactionService.findByNotificationCodeAndSave(request.params.notificationCode);
                })
                .then(() => response.status(200).end())
                .catch(error => next(error));
        });

    router
        .route("/transactions/:userId")
        .get(bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var service: IUserService = new UserService();
            service.findById(request.params.userId)
                .then((user: IUser) => {
                    var transactionService: ITransactionService = new TransactionService(user);
                    return transactionService.find(null);
                })
                .then((transactions: Array<ITransaction>) => response.status(200).json(transactions))
                .catch(error => next(error));
        });

    router
        .route("/transactions/:userId/:id")
        .get(bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var service: IUserService = new UserService();
            service.findById(request.params.userId)
                .then((user: IUser) => {
                    var transactionService: ITransactionService = new TransactionService(user);
                    return transactionService.findByCodeAndSave(request.params.id);
                })
                .then(() => response.status(200).end())
                .catch(error => next(error));
        });

    router
        .route("/payments/:userId/:id")
        .post(bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var service: IUserService = new UserService();
            var checkoutService: ICheckoutService;
            var pagseguroService: IPagSeguroSevice;
            service.findById(request.params.userId)
                .then((user: IUser) => {
                    checkoutService = new CheckoutService(user);
                    pagseguroService = new PagSeguroService(user);
                    return checkoutService.findById(request.params.id);
                })
                .then((checkout: ICheckout) => {
                    return pagseguroService.sendPayment(checkout);
                })
                .then((redirectURL: string) => response.status(201).json({redirectURL: redirectURL}))
                .catch(error => next(error));
        });

    return router;
};
