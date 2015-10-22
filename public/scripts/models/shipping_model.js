"use strict";
var EnumShipping;
(function (EnumShipping) {
    EnumShipping[EnumShipping["pac"] = 1] = "pac";
    EnumShipping[EnumShipping["sedex"] = 2] = "sedex";
    EnumShipping[EnumShipping["nao_especificado"] = 3] = "nao_especificado";
})(EnumShipping || (EnumShipping = {}));
;
var ShippingModel = (function () {
    function ShippingModel(shippingData) {
        angular.extend(this, shippingData);
        this.address = new AddressModel(this.address);
    }
    return ShippingModel;
})();
angular.module("n4_payment")
    .factory("ShippingModel", function () { return ShippingModel; });
