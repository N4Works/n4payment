"use strict";
var mongoose = require("mongoose");
;
exports.DocumentSchema = {
    type: { type: "string", enum: ["CPF"] },
    value: { type: "string", match: /^\d{11}$/ }
};
exports.Document = mongoose.model("Document", new mongoose.Schema(exports.DocumentSchema));
