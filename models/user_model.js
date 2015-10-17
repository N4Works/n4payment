"use strict";
var mongoose = require("mongoose");
var EnumService = (function () {
    function EnumService() {
    }
    EnumService.pagseguro = "pagseguro";
    return EnumService;
})();
exports.EnumService = EnumService;
;
var EnumPayment = (function () {
    function EnumPayment() {
    }
    EnumPayment.payment = "payment";
    EnumPayment.subscription = "subscription";
    EnumPayment.sandbox = "sandbox";
    return EnumPayment;
})();
exports.EnumPayment = EnumPayment;
;
;
exports.User = mongoose.model("User", new mongoose.Schema({
    email: { type: "string", lowercase: true, maxLength: 60, required: true },
    password: { type: "string", required: true },
    token: { type: "string", required: true, match: /^\w{32}$/ },
    payment: { type: "string", enum: ["payment", "subscription", "sandbox"], required: true }
}));
