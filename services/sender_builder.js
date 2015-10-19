"use strict";
var sender_model_1 = require("../models/sender_model");
var phone_builder_1 = require("./phone_builder");
var document_builder_1 = require("./document_builder");
var SenderBuilder = (function () {
    function SenderBuilder(builder) {
        this.builder = builder;
        this.sender = new sender_model_1.Sender();
    }
    SenderBuilder.prototype.withName = function (name) {
        this.sender.name = name;
        return this;
    };
    SenderBuilder.prototype.withEmail = function (email) {
        this.sender.email = email;
        return this;
    };
    SenderBuilder.prototype.withPhone = function (phone) {
        if (!!phone) {
            this.sender.phone = phone;
        }
        return new phone_builder_1.PhoneBuilder(this);
    };
    SenderBuilder.prototype.withDocument = function (document) {
        if (!!document) {
            this.sender.documents.push(document);
        }
        return new document_builder_1.DocumentBuilder(this);
    };
    SenderBuilder.prototype.bornIn = function (bornDate) {
        this.sender.bornDate = bornDate;
        return this;
    };
    SenderBuilder.prototype.build = function () {
        return this.sender;
    };
    SenderBuilder.prototype.buildAndReturn = function () {
        this.builder.to(this.sender);
        return this.builder;
    };
    SenderBuilder.prototype.return = function () {
        return this.builder;
    };
    return SenderBuilder;
})();
exports.SenderBuilder = SenderBuilder;
