"use strict";
var phone_model_1 = require("../models/phone_model");
var PhoneBuilder = (function () {
    function PhoneBuilder(senderBuilder) {
        this.senderBuilder = senderBuilder;
        this.phone = new phone_model_1.Phone();
    }
    PhoneBuilder.prototype.withAreaCode = function (areaCode) {
        this.phone.areaCode = areaCode;
        return this;
    };
    PhoneBuilder.prototype.withNumber = function (number) {
        this.phone.number = number;
        return this;
    };
    PhoneBuilder.prototype.build = function () {
        return this.phone;
    };
    PhoneBuilder.prototype.buildAndReturn = function () {
        this.senderBuilder.withPhone(this.phone);
        return this.senderBuilder;
    };
    PhoneBuilder.prototype.return = function () {
        return this.senderBuilder;
    };
    return PhoneBuilder;
})();
exports.PhoneBuilder = PhoneBuilder;
