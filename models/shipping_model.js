"use strict";
var mongoose = require("mongoose");
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
    cost: { type: "number", min: 0, max: 9999999 },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" }
}));
