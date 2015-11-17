"use strict";

class SenderController {
    private sender: SenderModel;
    constructor(private resource: SenderResource,
        private parameters: ng.route.IRouteParamsService,
        private location: ng.ILocationService) {
        var self = this;
        if (parameters["id"]) {
            resource.findById(parameters["id"])
                .then(sender => self.sender = sender)
                .catch(error => console.log(error));
        } else {
            this.sender = new SenderModel();
        }
    }

    save() {
        var self = this;
        this.resource.save(this.sender)
            .then((sender: SenderModel) => {
                self.location.path("/senders");
            })
            .catch((error: any) => console.log(error));
    }

    delete() {
        var self = this;
        this.resource.delete(this.sender._id)
            .then(() => self.location.path("/senders"))
            .catch((error: any) => console.log(error));

    }
}

angular.module("n4_payment")
    .controller("SenderController", [
    "SenderResource",
    "$routeParams",
    "$location",
    SenderController
]);
