"use strict";
var item_model_1 = require("../models/item_model");
var ItemBuilder = (function () {
    function ItemBuilder(builder) {
        this.builder = builder;
        this.item = new item_model_1.Item();
    }
    ItemBuilder.prototype.withId = function (id) {
        this.item.id = id;
        return this;
    };
    ItemBuilder.prototype.withDescription = function (description) {
        this.item.description = description;
        return this;
    };
    ItemBuilder.prototype.withAmount = function (amount) {
        this.item.amount = amount;
        return this;
    };
    ItemBuilder.prototype.withQuantity = function (quantity) {
        this.item.quantity = quantity;
        return this;
    };
    ItemBuilder.prototype.withShippingCostOf = function (shippingCost) {
        this.item.shippingCost = shippingCost;
        return this;
    };
    ItemBuilder.prototype.withWeight = function (weight) {
        this.item.weight = weight;
        return this;
    };
    ItemBuilder.prototype.build = function () {
        return this.item;
    };
    ItemBuilder.prototype.buildAndReturn = function () {
        this.builder.withItem(this.item);
        return this.builder;
    };
    ItemBuilder.prototype.return = function () {
        return this.builder;
    };
    return ItemBuilder;
})();
exports.ItemBuilder = ItemBuilder;
