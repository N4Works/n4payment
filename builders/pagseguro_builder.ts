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
import {ICheckoutService} from "../services/checkout_service";
import {CheckoutService} from "../services/checkout_service";
import {EnumURLPagSeguro} from "../models/urlpagseguro_enum";
import * as request from "request";
var xml2json = require("xml2json");

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
    constructor(private user: IUser) {
    }

    static createPaymentFor(user: IUser): PaymentBuilder {
        var builder: PagSeguroBuilder = new PagSeguroBuilder(user);
        return new PaymentBuilder(builder, user);
    }

    static createSubscriptionFor(user: IUser): SubscriptionBuilder {
        var builder: PagSeguroBuilder = new PagSeguroBuilder(user);
        return new SubscriptionBuilder(builder, user);
    }

    send(checkout: ICheckout): Promise<string> {
        var self = this;
        return new Promise<string>((resolve: Function, reject: Function) => {
            var checkoutService: ICheckoutService = new CheckoutService();
            checkoutService.insert(checkout)
                .then((c: ICheckout) => {
                return checkoutService.getXML(c);
            })
                .then((xml: string) => {
                var urlCheckout = process.env.NODE_ENV === "production" ? EnumURLPagSeguro.checkout_production : EnumURLPagSeguro.checkout_development;
                var requestOptions: request.Options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/xml; charset=UTF-8"
                    },
                    uri: `${urlCheckout}?email=${checkout.receiver.email}&token=${checkout.receiver.token}`,
                    body: xml
                };
                request(requestOptions, (error: any, response: any, body: any) => {
                    if (!!error) {
                        return reject(error);
                    }
                    var data: any = xml2json.toJson(body, {object:true});
                    if (!!data.errors) {
                        data.errors = data.errors.error instanceof Array ? data.errors.error : [data.errors.error];
                        var mensagem = "Foram encontrados os seguintes problemas na requisição:\n";
                        mensagem += data.errors.map(e => `  - ${e.code} -> ${e.message};`).join("\n");
                        return reject(mensagem);
                    }
                    var checkout:ICheckoutResponse = data.checkout;
                    var urlPayment = process.env.NODE_ENV === "production" ? EnumURLPagSeguro.payment_production : EnumURLPagSeguro.payment_development;
                    return resolve(`${urlPayment}?code=${checkout.code}`);
                });
            })
                .catch((error: any) => reject(error));
        });
    }
}