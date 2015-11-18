"use strict";

class SenderController {
    private sender: SenderModel;
    constructor(private resource: SenderResource,
        private parameters: ng.route.IRouteParamsService,
        private location: ng.ILocationService,
        private notificationsService: n4Notifications.N4NotificationsService) {
        var self = this;
        this.sender = new SenderModel();
        if (parameters["id"]) {
            resource.findById(parameters["id"])
                .then(sender => self.sender = sender)
                .catch(error => self.notificationsService.notifyAlert(error, "Ok"));
        }
    }

    save() {
        var self = this;
        this.resource.save(this.sender)
            .then((sender: SenderModel) => {
                self.notificationsService.notifySuccess("Cadastro realizado.", "Ok");
                self.location.path("/senders");
            })
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));
    }

    delete() {
        var self = this;
        this.resource.delete(this.sender._id)
            .then(() => self.location.path("/senders"))
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));

    }
}

angular.module("n4_payment")
    .controller("SenderController", [
    "SenderResource",
    "$routeParams",
    "$location",
    "n4NotificationsService",
    SenderController
]);
