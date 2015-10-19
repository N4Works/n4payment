"use strict";

import {IUser} from "../models/user_model";
import {ISender} from "../models/pagseguro_model";
import {ICheckout} from "../models/pagseguro_model";
import {Checkout} from "../models/pagseguro_model";
import {IParentSenderBuilder} from "./sender_builder";
import {ISenderBuilder} from "./sender_builder";
import {SenderBuilder} from "./sender_builder";
var jsontoxml = require("jsontoxml");


/**
 * Enumerador para o ambiente/tipo de requisição que será realizada no PagSeguro.
 *
 * production: URL de produção.
 * development: URL para desenvolvimento, teste.
 */
class EnumURLPagSeguro {
    static development:string = "https://ws.sandbox.pagseguro.uol.com.br/v2/checkout";
    static production:string = "https://ws.pagseguro.uol.com.br/v2/checkout";
}

enum EnumPayment {
    payment,
    subscription
}

export interface IPaymentBuilder {
    to(sender?:ISender):ISenderBuilder;
    send():Promise<string>;
}

class PaymentBuilder implements IPaymentBuilder {
    checkout: ICheckout;
    constructor(private pagSeguroBuilder: PagSeguroBuilder, private user:IUser) {
        this.checkout = new Checkout();
        this.checkout.receiver = user;
    }

    to(sender?:ISender):ISenderBuilder {
        if (!!sender) {
            this.checkout.sender = sender;
        }
        return new SenderBuilder(this);
    }

    send():Promise<string> {
        return this.pagSeguroBuilder.send<ICheckout>(this.checkout);
    }
}

class SubscriptionBuilder {
    constructor(private pagSeguroBuilder: PagSeguroBuilder, private user: IUser) {
    }

    return():PagSeguroBuilder {
        return this.pagSeguroBuilder;
    }
}

export class PagSeguroBuilder {
    private url:string = EnumURLPagSeguro.development;
    constructor() {
        this.url = process.env.NODE_ENV === "production" ? EnumURLPagSeguro.production : EnumURLPagSeguro.development;
    }

    static createPaymentFor(user:IUser):PaymentBuilder {
        var builder: PagSeguroBuilder = new PagSeguroBuilder();
        return new PaymentBuilder(builder, user);
    }

    static createSubscriptionFor(user:IUser):SubscriptionBuilder {
        var builder: PagSeguroBuilder = new PagSeguroBuilder();
        return new SubscriptionBuilder(builder, user);
    }

    send<T>(checkout:T):Promise<string> {
        var self = this;
        return new Promise<string>((resolve: Function, reject: Function) => {
            var options = {
                xmlHeader: {
                    standalone: true
                },
                prettyPrint: true
            };

            var xml = jsontoxml(checkout, options);
            resolve(xml);
        });
    }
}
