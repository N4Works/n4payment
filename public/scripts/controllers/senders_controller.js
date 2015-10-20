"use strict";
var SendersController = (function () {
    function SendersController(resource) {
        this.resource = resource;
        this.sender = new SenderModel();
        this.senders = new Array();
        var self = this;
        resource.findAll()
            .then(function (senders) { return self.senders = senders; });
    }
    SendersController.prototype.save = function () {
        var self = this;
        this.resource.save(this.sender)
            .then(function (sender) {
            if (!self.sender._id) {
                self.senders.unshift(sender);
            }
            self.sender = new SenderModel();
        })
            .catch(function (error) { return console.log(error); });
    };
    SendersController.prototype.edit = function (sender) {
        this.sender = sender;
    };
    SendersController.prototype.delete = function (sender) {
        var self = this;
        this.resource.delete(sender._id)
            .then(function () { return self.senders.splice(self.senders.indexOf(sender), 1); })
            .catch(function (error) { return console.log(error); });
    };
    return SendersController;
})();
angular.module("n4_payment")
    .controller("SendersController", [
    "SenderResource",
    SendersController
]);
