"use strict";

import {IUser} from "../models/user_model";
import {ISender} from "../models/sender_model";
import {IDocument} from "../models/document_model";
import {IItem} from "../models/item_model";
import {ICheckout} from "../models/checkout_model";
import {Checkout} from "../models/checkout_model";
import {ICheckoutResponse} from "../models/checkout_model";
import {IParentSenderBuilder} from "./sender_builder";
import {ISenderBuilder} from "./sender_builder";
import {SenderBuilder} from "./sender_builder";
import {IItemBuilder} from "./item_builder";
import {ItemBuilder} from "./item_builder";
import {IShipping} from "../models/shipping_model";
import {IShippingBuilder} from "./shipping_builder";
import {ShippingBuilder} from "./shipping_builder";
import * as request from "request";
var jsontoxml = require("jsontoxml");


/**
 * Enumerador para o ambiente/tipo de requisição que será realizada no PagSeguro.
 *
 * production: URL de produção.
 * development: URL para desenvolvimento, teste.
 */
class EnumURLPagSeguro {
    static development: string = "https://ws.sandbox.pagseguro.uol.com.br/v2/checkout";
    static production: string = "https://ws.pagseguro.uol.com.br/v2/checkout";
}

enum EnumPayment {
    payment,
    subscription
}

export interface IPaymentBuilder {
    to(sender?: ISender): ISenderBuilder;
    inCurrency(currency: string): IPaymentBuilder;
    withReference(reference: string): IPaymentBuilder;
    withShipping(shipping?: IShipping): IShippingBuilder;
    withItem(item?: IItem): IItemBuilder;
    withExtraAmount(extraAmount: number): IPaymentBuilder;
    withRedirectURL(redirectURL: string): IPaymentBuilder;
    withNotificationURL(notificationURL: string): IPaymentBuilder;
    withMaxUses(maxUses: number): IPaymentBuilder;
    withMaxAge(maxAge: number): IPaymentBuilder;
    send(): Promise<string>;
}

class PaymentBuilder implements IPaymentBuilder {
    checkout: ICheckout;
    constructor(private pagSeguroBuilder: PagSeguroBuilder, private user: IUser) {
        this.checkout = new Checkout();
        this.checkout.receiver = user;
    }

    to(sender?: ISender): ISenderBuilder {
        if (!!sender) {
            this.checkout.sender = sender;
        }
        return new SenderBuilder(this);
    }

    inCurrency(currency: string) {
        this.checkout.currency = currency;
        return this;
    }

    withReference(reference: string): IPaymentBuilder {
        this.checkout.reference = reference;
        return this;
    }

    withItem(item?: IItem): IItemBuilder {
        if (!!item) {
            this.checkout.items.push(item);
        }
        return new ItemBuilder(this);
    }

    withShipping(shipping?: IShipping): IShippingBuilder {
        if (!!shipping) {
            this.checkout.shipping = shipping;
        }
        return new ShippingBuilder(this);
    }

    withExtraAmount(extraAmount: number): IPaymentBuilder {
        this.checkout.extraAmount = extraAmount;
        return this;
    }

    withRedirectURL(redirectURL: string): IPaymentBuilder {
        this.checkout.redirectURL = redirectURL;
        return this;
    }

    withNotificationURL(notificationURL: string): IPaymentBuilder {
        this.checkout.notificationURL = notificationURL;
        return this;
    }

    withMaxUses(maxUses: number): IPaymentBuilder {
        this.checkout.maxUses = maxUses;
        return this;
    }

    withMaxAge(maxAge: number): IPaymentBuilder {
        this.checkout.maxAge = maxAge;
        return this;
    }

    send(): Promise<string> {
        return this.pagSeguroBuilder.send(this.checkout);
    }
}

class SubscriptionBuilder {
    constructor(private pagSeguroBuilder: PagSeguroBuilder, private user: IUser) {
    }

    return(): PagSeguroBuilder {
        return this.pagSeguroBuilder;
    }
}

export class PagSeguroBuilder {
    private url: string = EnumURLPagSeguro.development;
    constructor() {
        this.url = process.env.NODE_ENV === "production" ? EnumURLPagSeguro.production : EnumURLPagSeguro.development;
    }

    static createPaymentFor(user: IUser): PaymentBuilder {
        var builder: PagSeguroBuilder = new PagSeguroBuilder();
        return new PaymentBuilder(builder, user);
    }

    static createSubscriptionFor(user: IUser): SubscriptionBuilder {
        var builder: PagSeguroBuilder = new PagSeguroBuilder();
        return new SubscriptionBuilder(builder, user);
    }

    send(checkout: ICheckout): Promise<string> {
        var self = this;
        return new Promise<string>((resolve: Function, reject: Function) => {
            var options = {
                xmlHeader: {
                    standalone: true
                },
                prettyPrint: true
            };
            var xml = jsontoxml({
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

            var requestOptions: request.Options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/xml; charset=UTF-8"
                },
                uri: self.url + `?email=${checkout.receiver.email}&token=${checkout.receiver.token}`,
                body: xml
            };

            request(requestOptions, (error: any, response: any, body: any) => {
                console.log(error);
                console.log(response);
                resolve(body);
                return;
            });
        });
    }
}
