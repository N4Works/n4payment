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
