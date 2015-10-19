"use strict";

import * as express from "express";
import * as bodyParser from "body-parser";
import {IUserService} from "../services/user_service";
import {UserService} from "../services/user_service";
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
                        .to()
                        .withName("Teste")
                        .withEmail("c68643050873498480057@sandbox.pagseguro.com.br")
                        .withPhone()
                        .withAreaCode(21)
                        .withNumber("985255667")
                        .buildAndReturn()
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
                        .withDocument()
                        .ofType("CPF")
                        .andValue("12561031799")
                        .buildAndReturn()
                        .buildAndReturn()
                        .send()
                        .then(xml => next(xml));
                });
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
