"use strict";
var document_model_1 = require("../models/document_model");
var DocumentBuilder = (function () {
    function DocumentBuilder(senderBuilder) {
        this.senderBuilder = senderBuilder;
        this.document = new document_model_1.Document();
    }
    DocumentBuilder.prototype.ofType = function (type) {
        this.document.type = type;
        return this;
    };
    DocumentBuilder.prototype.andValue = function (value) {
        this.document.value = value;
        return this;
    };
    DocumentBuilder.prototype.build = function () {
        return this.document;
    };
    DocumentBuilder.prototype.buildAndReturn = function () {
        this.senderBuilder.withDocument(this.document);
        return this.senderBuilder;
    };
    DocumentBuilder.prototype.return = function () {
        return this.senderBuilder;
    };
    return DocumentBuilder;
})();
exports.DocumentBuilder = DocumentBuilder;
