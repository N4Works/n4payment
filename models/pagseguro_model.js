"use strict";
var mongoose = require("mongoose");
;
exports.Address = mongoose.model("Address", new mongoose.Schema({
    street: { type: "string", maxLength: 80 },
    number: { type: "string", maxLength: 20 },
    postalCode: { type: "string", match: /\^d{8}$/ },
    city: { type: "string", minLength: 2, maxLength: 60 },
    state: { type: "string", match: /^[A-Z]{2}$/ },
    country: { type: "string", default: "BRA", match: /ˆBRA$/ },
    complement: { type: "string", maxLength: 40 },
    district: { type: "string", maxLength: 60 }
}));
;
exports.Phone = mongoose.model("Phone", new mongoose.Schema({
    areaCode: { type: "string", match: /^\d{2}$/ },
    number: { type: "string", match: /^\d{7,9}$/ }
}));
;
exports.Document = mongoose.model("Document", new mongoose.Schema({
    type: { type: "string", enum: ["CPF"] },
    value: { type: "string", match: /^\d{11}$/ }
}));
;
exports.Sender = mongoose.model("Sender", new mongoose.Schema({
    name: { type: "string", maxLength: 50 },
    email: { type: "string", lowercase: true, maxLength: 60 },
    phone: { type: mongoose.Schema.Types.ObjectId, ref: "Phone" },
    documents: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
    bornDate: { type: "Date" },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" }
}));
;
exports.Item = mongoose.model("Item", new mongoose.Schema({
    id: { type: "string", required: true, maxLength: 100 },
    description: { type: "string", required: true, maxLength: 100 },
    amount: { type: "number", required: true, min: 0, max: 9999999 },
    quantity: { type: "number", required: true, min: 1, max: 999 },
    shippingCost: { type: "number", min: 0, max: 9999999 },
    weight: "number"
}));
(function (EnumShipping) {
    EnumShipping[EnumShipping["pac"] = 1] = "pac";
    EnumShipping[EnumShipping["sedex"] = 2] = "sedex";
    EnumShipping[EnumShipping["nao_especificado"] = 3] = "nao_especificado";
})(exports.EnumShipping || (exports.EnumShipping = {}));
var EnumShipping = exports.EnumShipping;
;
;
exports.Shipping = mongoose.model("Shipping", new mongoose.Schema({
    type: { type: "number", enum: [1, 2, 3], default: 3 },
    cost: { type: "number", min: 0, max: 9999999 }
}));
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
    items: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
    reference: { type: "string", maxLength: 200 },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "Sender" },
    shipping: { type: mongoose.Schema.Types.ObjectId, ref: "Shipping" },
    extraAmount: { type: "extraAmount", min: -9999999, max: 9999999 },
    redirectURL: { type: "string", maxLength: 255 },
    notificationURL: { type: "string", maxLength: 255 },
    maxUses: { type: "number", min: 0, max: 999 }
}));
;
;
;
