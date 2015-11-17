"use strict";

class ItemController {
    private item: ItemModel;
    constructor(private resource: ItemResource,
        private parameters: ng.route.IRouteParamsService,
        private location: ng.ILocationService) {
        var self = this;
        if (parameters["id"]) {
            resource.findById(parameters["id"])
                .then(item => self.item = item)
                .catch(error => console.log(error));
        } else {
            this.item = new ItemModel();
        }
    }

    save() {
        var self = this;
        this.resource.save(this.item)
            .then((item: ItemModel) => {
                self.location.path("/items");
            })
            .catch((error: any) => console.log(error));
    }

    delete() {
        var self = this;
        this.resource.delete(this.item._id)
            .then(() => self.location.path("/items"))
            .catch((error: any) => console.log(error));

    }
}

angular.module("n4_payment")
    .controller("ItemController", [
    "ItemResource",
    "$routeParams",
    "$location",
    ItemController
]);
