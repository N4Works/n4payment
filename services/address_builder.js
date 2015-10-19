"use strict";
var address_model_1 = require("../models/address_model");
var AddressBuilder = (function () {
    function AddressBuilder(builder) {
        this.builder = builder;
        this.address = new address_model_1.Address();
    }
    AddressBuilder.prototype.atStreet = function (street) {
        this.address.street = street;
        return this;
    };
    AddressBuilder.prototype.atNumber = function (number) {
        this.address.number = number;
        return this;
    };
    AddressBuilder.prototype.withPostalCode = function (postalCode) {
        this.address.postalCode = postalCode;
        return this;
    };
    AddressBuilder.prototype.inDistrict = function (district) {
        this.address.district = district;
        return this;
    };
    AddressBuilder.prototype.inCity = function (city) {
        this.address.city = city;
        return this;
    };
    AddressBuilder.prototype.inState = function (state) {
        this.address.state = state;
        return this;
    };
    AddressBuilder.prototype.inCountry = function (city) {
        this.address.city = city;
        return this;
    };
    AddressBuilder.prototype.withComplement = function (complement) {
        this.address.complement = complement;
        return this;
    };
    AddressBuilder.prototype.build = function () {
        return this.address;
    };
    AddressBuilder.prototype.buildAndReturn = function () {
        this.builder.withAddress(this.address);
        return this.builder;
    };
    AddressBuilder.prototype.return = function () {
        return this.builder;
    };
    return AddressBuilder;
})();
exports.AddressBuilder = AddressBuilder;
