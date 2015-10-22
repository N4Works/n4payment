"use strict";

class ItemModel {
    id: string;
    description: string;
    amount: number;
    quantity: number;
    shippingCost: number;
    weight: number;
    constructor(itemData?:any) {
        angular.extend(this, itemData);
    }
}

angular.module("n4_payment")
.factory("ItemModel", () => ItemModel);
