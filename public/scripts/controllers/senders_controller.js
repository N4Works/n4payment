"use strict";
var SendersController = (function () {
    function SendersController(resource, notificationsService) {
        this.resource = resource;
        this.notificationsService = notificationsService;
        this.senders = new Array();
        var self = this;
        resource.findAll()
            .then(function (senders) { return self.senders = senders; })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    }
    SendersController.prototype.delete = function (sender) {
        var self = this;
        this.resource.delete(sender._id)
            .then(function () { return self.senders.splice(self.senders.indexOf(sender), 1); })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    };
    return SendersController;
})();
angular.module("n4_payment")
    .controller("SendersController", [
    "SenderResource",
    "n4NotificationsService",
    SendersController
]);
