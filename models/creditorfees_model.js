"use strict";
var mongoose = require("mongoose");
;
exports.CreditorFeesSchema = {
    intermediationRateAmount: { type: "number" },
    intermediationFeeAmount: { type: "number" }
};
exports.CreditorFees = mongoose.model("CreditorFees", new mongoose.Schema(exports.CreditorFeesSchema));
