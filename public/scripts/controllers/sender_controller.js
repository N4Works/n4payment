"use strict";
var SenderController = (function () {
    function SenderController(resource, parameters, location, notificationsService) {
        this.resource = resource;
        this.parameters = parameters;
        this.location = location;
        this.notificationsService = notificationsService;
        var self = this;
        this.sender = new SenderModel();
        if (parameters["id"]) {
            resource.findById(parameters["id"])
                .then(function (sender) { return self.sender = sender; })
                .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
        }
    }
    SenderController.prototype.save = function () {
        var self = this;
        this.resource.save(this.sender)
            .then(function (sender) {
            self.notificationsService.notifySuccess("Cadastro realizado.", "Ok");
            self.location.path("/senders");
        })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    };
    SenderController.prototype.delete = function () {
        var self = this;
        this.resource.delete(this.sender._id)
            .then(function () { return self.location.path("/senders"); })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    };
    return SenderController;
})();
angular.module("n4_payment")
    .controller("SenderController", [
    "SenderResource",
    "$routeParams",
    "$location",
    "n4NotificationsService",
    SenderController
]);
