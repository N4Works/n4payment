"use strict";
var mongoose = require("mongoose");
;
exports.PhoneSchema = {
    areaCode: { type: "string", match: /^\d{2}$/ },
    number: { type: "string", match: /^\d{7,9}$/ }
};
exports.Phone = mongoose.model("Phone", new mongoose.Schema(exports.PhoneSchema));
