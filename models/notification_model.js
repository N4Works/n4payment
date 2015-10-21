"use strict";
var mongoose = require("mongoose");
;
exports.NotificationSchema = new mongoose.Schema({
    notificationCode: { type: "string", match: /^\d{39}$/ },
    notificationType: { type: "string", enum: ["transaction"] }
});
exports.Notification = mongoose.model("Notification", exports.NotificationSchema);
