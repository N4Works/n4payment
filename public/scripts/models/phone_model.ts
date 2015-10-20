"use strict";

class PhoneModel {
    areaCode:string;
    number:string;
    constructor(phoneData?:any) {
        angular.extend(this, phoneData);
    }
}

angular.module("n4_payment")
.factory("PhoneModel", () => PhoneModel);
