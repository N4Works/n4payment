"use strict";
var AddressModel = (function () {
    function AddressModel(addressData) {
        angular.extend(this, addressData);
        this.country = "BRA";
    }
    return AddressModel;
})();
angular.module("n4_payment")
    .factory("AddressModel", function () { return AddressModel; });
