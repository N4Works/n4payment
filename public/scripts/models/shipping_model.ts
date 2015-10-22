"use strict";

enum EnumShipping {
    pac = 1,
    sedex = 2,
    nao_especificado = 3
};

class ShippingModel {
    type: EnumShipping;
    cost: number;
    address: AddressModel;
    constructor(shippingData?:any) {
        angular.extend(this, shippingData);
        this.address = new AddressModel(this.address);
    }
}

angular.module("n4_payment")
.factory("ShippingModel", () => ShippingModel);
