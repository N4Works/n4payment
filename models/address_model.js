"use strict";
var mongoose = require("mongoose");
;
exports.AddressSchema = {
    street: { type: "string", maxLength: [80, "A rua do endereço deve ter no máximo 80 carácteres."] },
    number: { type: "string", maxLength: [20, "O número do endereço deve ter no máximo 20 carácteres."] },
    postalCode: { type: "string", match: [/\^d{8}$/, "O código postal deve ser composto por 8 digitos."] },
    city: { type: "string", minLength: [2, "A cidade deve ter no mínimo 2 carácteres."], maxLength: [60, "A cidade deve ter no máximo 60 carácteres"] },
    state: { type: "string", match: [/^[A-Z]{2}$/, "O estado deve ser composto por duas letras maiusculas."] },
    country: { type: "string", default: "BRA", match: [/^BRA$/, "Somente é aceito \"BRA\" como país."] },
    complement: { type: "string", maxLength: [40, "O complemento deve ter no máximo 40 carácteres."] },
    district: { type: "string", maxLength: [60, "O bairro deve ter no máximo 60 carácteres."] }
};
exports.Address = mongoose.model("Address", new mongoose.Schema(exports.AddressSchema));
