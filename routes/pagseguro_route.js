"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var user_service_1 = require("../services/user_service");
var shipping_model_1 = require("../models/shipping_model");
var pagseguro_builder_1 = require("../services/pagseguro_builder");
var cors = require("cors");
var xmlparser = require("express-xml-bodyparser");
exports.Router = function (server) {
    var router = express.Router(server);
    router
        .route("/")
        .get(bodyParser.json({}), function (request, response, next) {
        var service = new user_service_1.UserService();
        service.find(null)
            .then(function (users) {
            pagseguro_builder_1.PagSeguroBuilder.createPaymentFor(users[0])
                .inCurrency("BRL")
                .withReference("reference123")
                .withMaxUses(999)
                .withMaxAge(999999999)
                .withRedirectURL("http://localhost:3000/api/pagseguro/redirect")
                .withNotificationURL("https://162.243.133.24/api/pagseguro/notification")
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
                .ofType(shipping_model_1.EnumShipping.sedex)
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
                .then(function (redirectURL) {
                return response.redirect(redirectURL);
            })
                .catch(function (error) { return next(error); });
        })
            .catch(function (error) { return next(error); });
    })
        .post(bodyParser.json({}), function (request, response) {
        response.end();
    });
    router
        .route("/notification")
        .post(cors({
        origin: "*"
    }), bodyParser.urlencoded({ extended: true }), xmlparser(), function (request, response, next) {
        console.log("#########################################################");
        console.log(request.query);
        console.log(request.params);
        console.log(request.body);
        console.log("#########################################################");
        response.status(200).end();
    });
    router
        .route("/redirect")
        .get(bodyParser.json({}), function (request, response, next) {
        response.json(request.query);
    });
    router
        .route("/:id")
        .get(bodyParser.json({}), function (request, response) {
        response.end();
    })
        .put(bodyParser.json({}), function (request, response) {
        response.end();
    })
        .delete(function (request, response) {
        response.end();
    });
    return router;
};
