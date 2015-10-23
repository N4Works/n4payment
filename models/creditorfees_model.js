"use strict";
var mongoose = require("mongoose");
;
exports.CreditorFeesSchema = {
    installmentFeeAmount: { type: "number" },
    operationalFeeAmount: { type: "number" },
    intermediationRateAmount: { type: "number" },
    intermediationFeeAmount: { type: "number" }
};
exports.CreditorFees = mongoose.model("CreditorFees", new mongoose.Schema(exports.CreditorFeesSchema));
