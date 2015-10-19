"use strict";
var mongoose = require("mongoose");
;
exports.ItemSchema = new mongoose.Schema({
    id: { type: "string", required: true, maxLength: 100 },
    description: { type: "string", required: true, maxLength: 100 },
    amount: { type: "number", required: true, min: 0, max: 9999999 },
    quantity: { type: "number", required: true, min: 1, max: 999 },
    shippingCost: { type: "number", min: 0, max: 9999999 },
    weight: "number"
});
exports.Item = mongoose.model("Item", exports.ItemSchema);
