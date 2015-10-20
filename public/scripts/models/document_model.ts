"use strict";

class DocumentModel {
    type:string;
    value:string;
    constructor(documentData?:any) {
        this.type = "CPF";
        angular.extend(this, documentData);
    }
}

angular.module("n4_payment")
.factory("DocumentModel", () => DocumentModel);
