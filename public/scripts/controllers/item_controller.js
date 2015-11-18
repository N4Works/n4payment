"use strict";
var ItemController = (function () {
    function ItemController(resource, parameters, location) {
        this.resource = resource;
        this.parameters = parameters;
        this.location = location;
        var self = this;
        this.item = new ItemModel();
        if (parameters["id"]) {
            resource.findById(parameters["id"])
                .then(function (item) { return self.item = item; })
                .catch(function (error) { return console.log(error); });
        }
    }
    ItemController.prototype.save = function () {
        var self = this;
        this.resource.save(this.item)
            .then(function (item) {
            self.location.path("/items");
        })
            .catch(function (error) { return console.log(error); });
    };
    ItemController.prototype.delete = function () {
        var self = this;
        this.resource.delete(this.item._id)
            .then(function () { return self.location.path("/items"); })
            .catch(function (error) { return console.log(error); });
    };
    return ItemController;
})();
angular.module("n4_payment")
    .controller("ItemController", [
    "ItemResource",
    "$routeParams",
    "$location",
    ItemController
]);
