"use strict";

import * as express from "express";
import * as bodyParser from "body-parser";
import {IUserService} from "../services/user_service";
import {UserService} from "../services/user_service";
import {EnumShipping} from "../models/shipping_model";
import {IUser} from "../models/user_model";
import {PagSeguroBuilder as Builder} from "../services/pagseguro_builder";

export var Router = (server: express.Router) => {
    var router: express.Router = express.Router(server);
    router
        .route("/")
        .get(bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var service:IUserService = new UserService();
            service.find({name: "atelie@elenaqueiroz.com.br"})
                .then((users:Array<IUser>) => {
                    Builder.createPaymentFor(users[0])
                        .inCurrency("BRL")
                        .withReference("reference123")
                        .withMaxUses(999)
                        .withMaxAge(999999999)
                        .withRedirectURL("http://162.243.133.24/api/pagseguro/redirect")
                        .withNotificationURL("http://162.243.133.24/api/pagseguro/notification")
                        .to()
                            .withName("Teste")
                            .withEmail("c68643050873498480057@sandbox.pagseguro.com.br")
                            .bornIn(new Date(1987,6,20))
                            .withPhone()
                                .withAreaCode(21)
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
                        .send()
                        .then(xml => next(xml))
                        .catch(error => next(error));
                })
                .catch(error => next(error));
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
