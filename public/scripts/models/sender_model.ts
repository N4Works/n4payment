"use strict";

class SenderModel {
    _id: string;
    name: string;
    email: string;
    phone: PhoneModel;
    documents: Array<DocumentModel>;
    bornDate: Date;
    constructor(senderData?:any) {
        if (!!senderData) {
            senderData.bornDate = !!senderData ? new Date(senderData.bornDate) : null;
            angular.extend(this, senderData);
        }
        this.phone = new PhoneModel(this.phone);
        this.documents = !!this.documents && this.documents.length > 0 ? this.documents.map(d => new DocumentModel(d)) : [ new DocumentModel() ];
    }
}

angular.module("n4_payment")
.factory("SenderModel", () => SenderModel);
