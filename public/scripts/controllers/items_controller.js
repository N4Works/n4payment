"use strict";
var ItemsController = (function () {
    function ItemsController(resource) {
        this.resource = resource;
        this.item = new ItemModel();
        var self = this;
        resource.findAll()
            .then(function (items) { return self.items = items; });
    }
    ItemsController.prototype.save = function () {
        var self = this;
        this.resource.save(this.item)
            .then(function (item) {
            if (!self.item._id) {
                self.items.unshift(item);
            }
            self.item = new ItemModel();
        })
            .catch(function (error) { return console.log(error); });
    };
    ItemsController.prototype.edit = function (item) {
        this.item = item;
    };
    ItemsController.prototype.delete = function (item) {
        var self = this;
        this.resource.delete(item._id)
            .then(function () { return self.items.splice(self.items.indexOf(item), 1); })
            .catch(function (error) { return console.log(error); });
    };
    return ItemsController;
})();
angular.module("n4_payment")
    .controller("ItemsController", [
    "ItemResource",
    ItemsController
]);
