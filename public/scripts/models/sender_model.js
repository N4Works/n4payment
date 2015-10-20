"use strict";
var SenderModel = (function () {
    function SenderModel(senderData) {
        if (!!senderData) {
            senderData.bornDate = !!senderData ? new Date(senderData.bornDate) : null;
            angular.extend(this, senderData);
        }
        this.phone = new PhoneModel(this.phone);
        this.documents = !!this.documents && this.documents.length > 0 ? this.documents.map(function (d) { return new DocumentModel(d); }) : [new DocumentModel()];
    }
    return SenderModel;
})();
angular.module("n4_payment")
    .factory("SenderModel", function () { return SenderModel; });
