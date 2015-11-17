"use strict";
;
var ItemResource = (function () {
    function ItemResource($resource) {
        this.provider = $resource("/api/items/:_id", { _id: "@_id" }, {
            update: {
                method: "PUT",
                isArray: false
            }
        });
    }
    ItemResource.prototype.save = function (item) {
        if (!!item._id) {
            return this.provider.update({ _id: item._id }, item)
                .$promise
                .then(function (itemData) { return new ItemModel(itemData); });
        }
        return this.provider.save(item)
            .$promise
            .then(function (itemData) { return new ItemModel(itemData); });
    };
    ItemResource.prototype.findAll = function () {
        return this.provider.query()
            .$promise
            .then(function (items) { return items.map(function (itemData) { return new ItemModel(itemData); }); });
    };
    ItemResource.prototype.findById = function (id) {
        return this.provider.get({ _id: id })
            .$promise
            .then(function (itemData) { return new ItemModel(itemData); });
    };
    ItemResource.prototype.delete = function (id) {
        return this.provider.delete({ _id: id })
            .$promise
            .then(function (itemData) { return new ItemModel(itemData); });
    };
    return ItemResource;
})();
angular.module("n4_payment")
    .factory("ItemResource", [
    "$resource",
    function ($resource) { return new ItemResource($resource); }
]);
