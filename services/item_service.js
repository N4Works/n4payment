"use strict";
var item_model_1 = require("../models/item_model");
var ItemService = (function () {
    function ItemService(user) {
        this.user = user;
    }
    ItemService.prototype.find = function (filter) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return item_model_1.Item.find(filter)
                .exec(function (error, items) {
                return (!!error) ? reject(error) : resolve(items);
            });
        });
    };
    ItemService.prototype.findById = function (id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return item_model_1.Item.findById(id, function (error, item) {
                return (!!error) ? reject(error) : resolve(item);
            });
        });
    };
    ItemService.prototype.insert = function (itemData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var item = new item_model_1.Item(itemData);
            item.save(function (error) { return !!error ? reject(error) : resolve(item); });
        });
    };
    ItemService.prototype.update = function (id, itemData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var update = new item_model_1.Item(itemData);
            item_model_1.Item.findByIdAndUpdate(id, update, function (error, item) { return !!error ? reject(error) : resolve(item); });
        });
    };
    ItemService.prototype.delete = function (id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return item_model_1.Item.findByIdAndRemove(id)
                .exec(function (error, item) { return !!error ? reject(error) : resolve(item); });
        });
    };
    return ItemService;
})();
exports.ItemService = ItemService;
