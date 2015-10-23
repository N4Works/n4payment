"use strict";
var sender_model_1 = require("../models/sender_model");
var SenderService = (function () {
    function SenderService() {
    }
    SenderService.prototype.find = function (filtro) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return sender_model_1.Sender.find(filtro, function (error, senders) {
                return (!!error) ? reject(error) : resolve(senders);
            });
        });
    };
    SenderService.prototype.findByEmail = function (email) {
        return this.find({
            email: email
        }).then(function (senders) { return senders.length > 0 ? senders[0] : null; });
    };
    SenderService.prototype.findById = function (id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return sender_model_1.Sender.findById(id, function (error, sender) {
                return (!!error) ? reject(error) : resolve(sender);
            });
        });
    };
    SenderService.prototype.insert = function (senderData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var sender = new sender_model_1.Sender(senderData);
            sender.save(function (error) { return !!error ? reject(error) : resolve(sender); });
        });
    };
    SenderService.prototype.update = function (id, senderData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            sender_model_1.Sender.findByIdAndUpdate(id, senderData, function (error, sender) { return !!error ? reject(error) : resolve(sender); });
        });
    };
    SenderService.prototype.delete = function (id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return sender_model_1.Sender.findByIdAndRemove(id, function (error, sender) { return !!error ? reject(error) : resolve(sender); });
        });
    };
    return SenderService;
})();
exports.SenderService = SenderService;
