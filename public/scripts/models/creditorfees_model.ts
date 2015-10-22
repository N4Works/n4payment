"use strict";

class CreditorFeesModel {
    intermediationRateAmount: number;
    intermediationFeeAmount: number;
    constructor(creditorFeesData?:any) {
        angular.extend(this, creditorFeesData);
    }
}

angular.module("n4_payment")
.factory("CreditorFeesModel", () => CreditorFeesModel);
