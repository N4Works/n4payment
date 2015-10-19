"use strict";
var mongoose = require("mongoose");
var item_model_1 = require("./item_model");
var EnumCurrency = (function () {
    function EnumCurrency() {
    }
    EnumCurrency.real = "BRL";
    return EnumCurrency;
})();
exports.EnumCurrency = EnumCurrency;
;
;
exports.Checkout = mongoose.model("Checkout", new mongoose.Schema({
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    currency: { type: "string", enum: ["BRL"], required: true },
    items: [item_model_1.ItemSchema],
    reference: { type: "string", maxLength: 200 },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "Sender" },
    shipping: { type: mongoose.Schema.Types.ObjectId, ref: "Shipping" },
    extraAmount: { type: "number", min: -9999999, max: 9999999 },
    redirectURL: { type: "string", maxLength: 255 },
    notificationURL: { type: "string", maxLength: 255 },
    maxUses: { type: "number", min: 0, max: 999 },
    maxAge: { type: "number", min: 30, max: 999999999 }
}));
;
;
;
