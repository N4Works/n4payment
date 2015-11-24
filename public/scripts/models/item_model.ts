"use strict";

class ItemModel {
    _id: string;
    id: string;
    description: string;
    amount: number;
    quantity: number;
    shippingCost: number;
    weight: number;
    constructor(itemData?:any) {
        this.quantity = 1.0;
        angular.extend(this, itemData);
    }
}

angular.module("n4_payment")
.factory("ItemModel", () => ItemModel);
