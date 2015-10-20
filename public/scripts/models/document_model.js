"use strict";
var DocumentModel = (function () {
    function DocumentModel(documentData) {
        this.type = "CPF";
        angular.extend(this, documentData);
    }
    return DocumentModel;
})();
angular.module("n4_payment")
    .factory("DocumentModel", function () { return DocumentModel; });
