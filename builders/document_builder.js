"use strict";
var document_model_1 = require("../models/document_model");
var DocumentBuilder = (function () {
    function DocumentBuilder(builder) {
        this.builder = builder;
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
        this.builder.withDocument(this.document);
        return this.builder;
    };
    DocumentBuilder.prototype.return = function () {
        return this.builder;
    };
    return DocumentBuilder;
})();
exports.DocumentBuilder = DocumentBuilder;
