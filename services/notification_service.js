"use strict";
var notification_model_1 = require("../models/notification_model");
var NotificationService = (function () {
    function NotificationService() {
    }
    NotificationService.prototype.find = function (filtro) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return notification_model_1.Notification.find(filtro, function (error, notifications) {
                return (!!error) ? reject(error) : resolve(notifications);
            });
        });
    };
    NotificationService.prototype.findById = function (id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return notification_model_1.Notification.findById(id, function (error, notification) {
                return (!!error) ? reject(error) : resolve(notification);
            });
        });
    };
    NotificationService.prototype.insert = function (notificationData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var notification = new notification_model_1.Notification(notificationData);
            notification.save(function (error) { return !!error ? reject(error) : resolve(notification); });
        });
    };
    NotificationService.prototype.update = function (id, notificationData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            notification_model_1.Notification.findByIdAndUpdate(id, notificationData, function (error, notification) { return !!error ? reject(error) : resolve(notification); });
        });
    };
    NotificationService.prototype.delete = function (id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return notification_model_1.Notification.findByIdAndRemove(id, function (error, notification) { return !!error ? reject(error) : resolve(notification); });
        });
    };
    return NotificationService;
})();
exports.NotificationService = NotificationService;
