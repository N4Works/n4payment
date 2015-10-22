"use strict";

class CheckoutModel {
    _id: string;
    receiver: UserModel;
    currency: string;
    items: Array<ItemModel>;
    reference: string;
    sender: SenderModel;
    shipping: ShippingModel;
    extraAmount: number;
    redirectURL: string;
    notificationURL: string;
    maxUses: number;
    maxAge: number;
    constructor(checkoutData?:any) {
        if (!!checkoutData) {
            angular.extend(this, checkoutData);
        }
        this.receiver = new UserModel(this.receiver);
        this.shipping = new ShippingModel(this.shipping);
        this.items = !!this.items && this.items.length > 0 ? this.items.map(i => new ItemModel(i)) : [ new ItemModel() ];
    }
}

angular.module("n4_payment")
.factory("CheckoutModel", () => CheckoutModel);
