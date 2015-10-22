"use strict";
var CreditorFeesModel = (function () {
    function CreditorFeesModel(creditorFeesData) {
        angular.extend(this, creditorFeesData);
    }
    return CreditorFeesModel;
})();
angular.module("n4_payment")
    .factory("CreditorFeesModel", function () { return CreditorFeesModel; });
