"use strict";
var mongoose = require("mongoose");
var document_model_1 = require("./document_model");
var phone_model_1 = require("./phone_model");
;
exports.SenderSchema = {
    name: { type: "string", maxLength: [50, "O nome do comprador deve ter no máximo 50 carácteres"] },
    email: { type: "string", lowercase: true, maxLength: [60, "O e-mail do comprador deve ter no máximo 60 carácteres."] },
    phone: phone_model_1.PhoneSchema,
    documents: [
        document_model_1.DocumentSchema
    ],
    bornDate: { type: "Date" }
};
exports.Sender = mongoose.model("Sender", new mongoose.Schema(exports.SenderSchema));
