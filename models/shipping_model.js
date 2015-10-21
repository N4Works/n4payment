"use strict";
var mongoose = require("mongoose");
var address_model_1 = require("./address_model");
(function (EnumShipping) {
    EnumShipping[EnumShipping["pac"] = 1] = "pac";
    EnumShipping[EnumShipping["sedex"] = 2] = "sedex";
    EnumShipping[EnumShipping["nao_especificado"] = 3] = "nao_especificado";
})(exports.EnumShipping || (exports.EnumShipping = {}));
var EnumShipping = exports.EnumShipping;
;
;
exports.ShippingSchema = {
    type: { type: "number", enum: [1, 2, 3], default: 3 },
    cost: { type: "number", min: [0, "A valor de frete deve ser maior que zero."], max: [9999999, "O valor de frete deve ser menor que 9.999.999,00"] },
    address: address_model_1.AddressSchema
};
exports.Shipping = mongoose.model("Shipping", new mongoose.Schema(exports.ShippingSchema));
