"use strict";
var mongoose = require("mongoose");
var document_model_1 = require("./document_model");
;
exports.Sender = mongoose.model("Sender", new mongoose.Schema({
    name: { type: "string", maxLength: 50 },
    email: { type: "string", lowercase: true, maxLength: 60 },
    phone: { type: mongoose.Schema.Types.ObjectId, ref: "Phone" },
    documents: [document_model_1.DocumentSchema],
    bornDate: { type: "Date" }
}));
