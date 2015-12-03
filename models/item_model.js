"use strict";
var mongoose = require("mongoose");
;
exports.ItemSchema = {
    id: { type: "string", required: true, maxLength: 100 },
    description: { type: "string", required: true, maxLength: 100 },
    amount: { type: "number", required: true, min: 0, max: 9999999 },
    quantity: { type: "number", required: true, min: 0, max: 999 },
    shippingCost: { type: "number", min: 0, max: 9999999, default: 0 },
    weight: { type: "number", min: 0, max: 30000, default: 0 }
};
exports.Item = mongoose.model("Item", new mongoose.Schema(exports.ItemSchema));
