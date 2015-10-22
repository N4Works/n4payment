"use strict";

class AddressModel {
    street: string;
    number: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    complement: string;
    district: string;
    constructor(addressData?:any) {
        angular.extend(this, addressData);
        this.country = "BRA";
    }
}

angular.module("n4_payment")
.factory("AddressModel", () => AddressModel);
