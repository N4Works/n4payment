"use strict";

import {ICheckout} from "../models/checkout_model";
import {IDocument} from "../models/document_model";
import {IItem} from "../models/item_model";
import {MCheckout} from "../models/checkout_model";
import {Checkout as TCheckout} from "../models/checkout_model";
var jsontoxml = require("jsontoxml");

export interface ICheckoutService {
    find(filtro: any): Promise<Array<ICheckout>>;
    findById(id: string): Promise<ICheckout>;
    insert(checkoutData: any): Promise<ICheckout>;
    update(id: string, checkoutData: any): Promise<ICheckout>;
    delete(id: string): Promise<ICheckout>;
    getXML(checkout: ICheckout): Promise<string>;
}

export class CheckoutService implements ICheckoutService {
    constructor(private Checkout: MCheckout = TCheckout) {
    };

    find(filtro: any) {
        var self = this;
        return new Promise<Array<ICheckout>>((resolve: Function, reject: Function) =>
            self.Checkout.find(filtro, (error: any, checkouts: Array<ICheckout>) =>
                (!!error) ? reject(error) : resolve(checkouts)));
    }

    findById(id: string) {
        var self = this;
        return new Promise<ICheckout>((resolve: Function, reject: Function) =>
            self.Checkout.findById(id, (error: any, checkout: ICheckout) =>
                (!!error) ? reject(error) : resolve(checkout)));
    }

    insert(checkoutData: any) {
        var self = this;
        return new Promise<ICheckout>((resolve: Function, reject: Function) => {
            var checkout: ICheckout = new self.Checkout(checkoutData);
            checkout.save(error => !!error ? reject(error) : resolve(checkout));
        });
    }

    update(id: string, checkoutData: any) {
        var self = this;
        return new Promise<ICheckout>((resolve: Function, reject: Function) => {
            self.Checkout.findByIdAndUpdate(id, checkoutData, (error: any, checkout: ICheckout) => !!error ? reject(error) : resolve(checkout));
        });
    }

    delete(id: string) {
        var self = this;
        return new Promise<ICheckout>((resolve: Function, reject: Function) =>
            self.Checkout.findByIdAndRemove(id, (error: any, checkout: ICheckout) => !!error ? reject(error) : resolve(checkout)));
    }

    getXML(checkout: ICheckout): Promise<string> {
        return new Promise<string>((resolve: Function, reject: Function) => {
            try {
                var options = {
                    xmlHeader: {
                        standalone: true
                    },
                    prettyPrint: true
                };
                var xml: string = jsontoxml({
                    checkout: {
                        currency: checkout.currency,
                        reference: checkout.reference,
                        redirectURL: checkout.redirectURL,
                        notificationURL: checkout.notificationURL,
                        maxUses: checkout.maxUses,
                        maxAge: checkout.maxAge,
                        sender: {
                            name: checkout.sender.name,
                            email: checkout.sender.email,
                            bornDate: checkout.sender.bornDate.toISOString().replace(/^(\d{4})-(\d{2})-(\d{2}).*$/, "$3/$2/$1"),
                            phone: {
                                areaCode: checkout.sender.phone.areaCode,
                                number: checkout.sender.phone.number
                            },
                            documents: checkout.sender.documents.map((d: IDocument) => {
                                return {
                                    document: {
                                        type: d.type,
                                        value: d.value
                                    }
                                };
                            })
                        },
                        items: checkout.items.map((i: IItem) => {
                            return {
                                item: {
                                    id: i.id,
                                    description: i.description,
                                    amount: i.amount.toFixed(2),
                                    quantity: i.quantity.toFixed(0),
                                    shippingCost: i.shippingCost.toFixed(2),
                                    weight: i.weight.toFixed(0)
                                }
                            };
                        }),
                        shipping: {
                            type: checkout.shipping.type,
                            cost: checkout.shipping.cost.toFixed(2),
                            address: {
                                street: checkout.shipping.address.street,
                                number: checkout.shipping.address.number,
                                postalCode: checkout.shipping.address.postalCode,
                                city: checkout.shipping.address.city,
                                state: checkout.shipping.address.state,
                                country: checkout.shipping.address.country,
                                complement: checkout.shipping.address.complement,
                                district: checkout.shipping.address.district
                            }
                        }
                    }
                }, options);
                resolve(xml);
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
