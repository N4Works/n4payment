"use strict";
var mongoose = require("mongoose");
;
var UserSchema = new mongoose.Schema({
    email: { type: "string", lowercase: true, maxLength: 60, required: true },
    password: { type: "string", required: true },
    token: { type: "string", required: true, match: /^\w{32}$/ },
    redirectURL: { type: "string", required: true },
    notificationURL: { type: "string", required: true }
});
exports.User = mongoose.model("User", UserSchema);
