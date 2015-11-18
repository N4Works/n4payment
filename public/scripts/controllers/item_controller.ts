"use strict";

class ItemController {
    private item: ItemModel;
    constructor(private resource: ItemResource,
        private parameters: ng.route.IRouteParamsService,
        private location: ng.ILocationService,
        private notificationsService: n4Notifications.N4NotificationsService) {
        var self = this;
        this.item = new ItemModel();
        if (parameters["id"]) {
            resource.findById(parameters["id"])
                .then(item => self.item = item)
                .catch(error => self.notificationsService.notifyAlert(error, "Ok"));
        }
    }

    save() {
        var self = this;
        this.resource.save(this.item)
            .then((item: ItemModel) => {
                self.notificationsService.notifySuccess("Cadastro realizado.", "Ok");
                self.location.path("/items");
            })
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));
    }

    delete() {
        var self = this;
        this.resource.delete(this.item._id)
            .then(() => self.location.path("/items"))
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));

    }
}

angular.module("n4_payment")
    .controller("ItemController", [
    "ItemResource",
    "$routeParams",
    "$location",
    "n4NotificationsService",
    ItemController
]);
