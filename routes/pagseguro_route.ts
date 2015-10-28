"use strict";

import * as express from "express";
import * as bodyParser from "body-parser";
import {IUserService} from "../services/user_service";
import {UserService} from "../services/user_service";
import {INotification} from "../models/notification_model";
import {ITransaction} from "../models/transaction_model";
import {ITransactionService} from "../services/transaction_service";
import {TransactionService} from "../services/transaction_service";
import {EnumShipping} from "../models/shipping_model";
import {ICheckoutResponse} from "../models/checkout_model";
import {IUser} from "../models/user_model";
import {IPaymentBuilder} from "../builders/payment_builder";
import {PaymentBuilder} from "../builders/payment_builder";
import * as cors from "cors";
var xmlparser = require("express-xml-bodyparser");

var createTest = (user: IUser) => {
    return new PaymentBuilder(user)
        .inCurrency("BRL")
        .withReference("reference123")
        .withMaxUses(999)
        .withMaxAge(999999999)
        .withRedirectURL("https://162.243.133.24/api/pagseguro/redirect")
        .withNotificationURL("https://162.243.133.24/api/pagseguro/notifications")
        .to()
        .withName("Tiago de Carvalho Resende")
        .withEmail("c68643050873498480057@sandbox.pagseguro.com.br")
        .bornIn(new Date(1987, 6, 20))
        .withPhone()
        .withAreaCode("21")
        .withNumber("985255667")
        .buildAndReturn()
        .withDocument()
        .ofType("CPF")
        .andValue("12561031799")
        .buildAndReturn()
        .buildAndReturn()
        .withItem()
        .withId("123456")
        .withDescription("Teste")
        .withAmount(100)
        .withQuantity(1)
        .withShippingCostOf(10)
        .withWeight(1)
        .buildAndReturn()
        .withItem()
        .withId("abc123")
        .withDescription("Teste2")
        .withAmount(150)
        .withQuantity(1)
        .withShippingCostOf(30)
        .withWeight(2)
        .buildAndReturn()
        .withShipping()
        .ofType(EnumShipping.sedex)
        .withAddress()
        .atStreet("Rua Amandio Caetano Pinto")
        .atNumber("143")
        .withPostalCode("25975720")
        .inDistrict("Tijuca")
        .inCity("Teresópolis")
        .inState("RJ")
        .inCountry("BRA")
        .withComplement("Apto 104")
        .buildAndReturn()
        .andCost(10)
        .buildAndReturn()
        .send();
};

export var Router = (server: express.Router) => {
    var router: express.Router = express.Router(server);
    router
        .route("/test")
        .get(bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var service: IUserService = new UserService();
            service.find(null)
                .then((users: Array<IUser>) => {
                createTest(users[0])
                    .then((redirectURL: string) => {
                    return response.redirect(redirectURL);
                })
                    .catch(error => next(error));
            })
                .catch(error => next(error));
        })
        .post(bodyParser.json({}),
        (request: express.Request, response: express.Response) => {
            response.end();
        });

    router
        .route("/notifications")
        .post(cors({
        origin: "pagseguro.uol.com.br"
    }), bodyParser.urlencoded({ extended: true }), xmlparser(),
        (request: express.Request, response: express.Response, next: Function) => {
            var notification: INotification = request.body;
            var service: IUserService = new UserService();
            service.find(null)
                .then((users: Array<IUser>) => {
                var transactionService: ITransactionService = new TransactionService(users[0]);
                return transactionService.findByNotificationCodeAndSave(notification.notificationCode)
                    .then(() => response.status(200).end());
            })
                .catch(error => next(error));
        });

    router
        .route("/notifications/:id")
        .get(bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var service: IUserService = new UserService();
            service.find(null)
                .then((users: Array<IUser>) => {
                var transactionService: ITransactionService = new TransactionService(users[0]);
                return transactionService.findByNotificationCodeAndSave(request.params.id)
                    .then(() => response.status(200).end());
            })
                .catch(error => next(error));
        });

    router
        .route("/transactions/")
        .get(bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var service: IUserService = new UserService();
            service.find(null)
                .then((users: Array<IUser>) => {
                var transactionService: ITransactionService = new TransactionService(users[0]);
                return transactionService.find(null)
                    .then((transactions: Array<ITransaction>) => response.status(200).json(transactions))
                    .catch((error: any) => next(error));
            })
                .catch(error => next(error));
        });

    router
        .route("/transactions/:id")
        .get(bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var service: IUserService = new UserService();
            service.find(null)
                .then((users: Array<IUser>) => {
                var transactionService: ITransactionService = new TransactionService(users[0]);
                return transactionService.findByCodeAndSave(request.params.id)
                    .then(() => response.status(200).end());
            })
                .catch(error => next(error));
        });

    return router;
};
