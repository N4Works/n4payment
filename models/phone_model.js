"use strict";
var mongoose = require("mongoose");
;
exports.Phone = mongoose.model("Phone", new mongoose.Schema({
    areaCode: { type: "string", match: /^\d{2}$/ },
    number: { type: "string", match: /^\d{7,9}$/ }
}));
