"use strict";
import * as mongoose from "mongoose";
;
export var User = mongoose.model("User", new mongoose.Schema({
    email: { type: "string", lowercase: true, maxLength: 60, required: true },
    password: { type: "string", required: true },
    token: { type: "string", required: true, match: /^\w{32}$/ }
}));
