"use strict";
var PhoneModel = (function () {
    function PhoneModel(phoneData) {
        angular.extend(this, phoneData);
    }
    return PhoneModel;
})();
angular.module("n4_payment")
    .factory("PhoneModel", function () { return PhoneModel; });
