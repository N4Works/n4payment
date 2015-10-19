"use strict";
var mongoose = require("mongoose");
;
exports.DocumentSchema = new mongoose.Schema({
    type: { type: "string", enum: ["CPF"] },
    value: { type: "string", match: /^\d{11}$/ }
});
exports.Document = mongoose.model("Document", exports.DocumentSchema);
