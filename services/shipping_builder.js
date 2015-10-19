"use strict";
var shipping_model_1 = require("../models/shipping_model");
var address_builder_1 = require("./address_builder");
var ShippingBuilder = (function () {
    function ShippingBuilder(builder) {
        this.builder = builder;
        this.shipping = new shipping_model_1.Shipping();
    }
    ShippingBuilder.prototype.ofType = function (type) {
        this.shipping.type = type;
        return this;
    };
    ShippingBuilder.prototype.withAddress = function (address) {
        if (address) {
            this.shipping.address = address;
        }
        return new address_builder_1.AddressBuilder(this);
    };
    ShippingBuilder.prototype.andCost = function (cost) {
        this.shipping.cost = cost;
        return this;
    };
    ShippingBuilder.prototype.build = function () {
        return this.shipping;
    };
    ShippingBuilder.prototype.buildAndReturn = function () {
        this.builder.withShipping(this.shipping);
        return this.builder;
    };
    ShippingBuilder.prototype.return = function () {
        return this.builder;
    };
    return ShippingBuilder;
})();
exports.ShippingBuilder = ShippingBuilder;
