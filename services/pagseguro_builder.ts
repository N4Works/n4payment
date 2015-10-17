"use strict";

import * as userModel from "../models/user_model";
import * as pagseguroModel from "../models/pagseguro_model";

class SenderBuilder<T> {
    constructor(private builder: T, private sender: pagseguroModel.ISender) {
    }

    withPhone(phone: pagseguroModel.IPhone):SenderBuilder<T> {
        this.sender.phone = phone;
        return this;
    }

    withAddress(address: pagseguroModel.IAddress):SenderBuilder<T> {
        this.sender.address = address;
        return this;
    }

    withDocument(document: pagseguroModel.IDocument):SenderBuilder<T> {
        this.sender.documents.push(document);
        return this;
    }

    return():T {
        return this.builder;
    }
}

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

class PaymentBuilder {
    checkout: pagseguroModel.ICheckout;
    constructor(private pagSeguroBuilder: PagSeguroBuilder, private user:userModel.IUser) {
        this.checkout = new pagseguroModel.Checkout();
        this.checkout.receiver = user;
    }

    to(sender: pagseguroModel.ISender) {
        this.checkout.sender = sender;
        return new SenderBuilder<PaymentBuilder>(this, sender);
    }

    return():PagSeguroBuilder {
        return this.pagSeguroBuilder;
    }

    send():Promise<void> {
        return new Promise<void>((resolve: Function, reject: Function) => {
            return;
        });
    }
}

class SubscriptionBuilder {
    constructor(private pagSeguroBuilder: PagSeguroBuilder, private user: userModel.IUser) {
    }

    return():PagSeguroBuilder {
        return this.pagSeguroBuilder;
    }
}

export class PagSeguroBuilder {
    payment:EnumPayment;
    url:string = EnumURLPagSeguro.development;
    constructor() {
        this.url = process.env.NODE_ENV === "production" ? EnumURLPagSeguro.production : EnumURLPagSeguro.development;
    }

    static createPaymentFor(user:userModel.IUser):PaymentBuilder {
        let builder: PagSeguroBuilder = new PagSeguroBuilder();
        builder.payment = EnumPayment.payment;
        return new PaymentBuilder(builder, user);
    }

    static createSubscriptionFor(user:userModel.IUser):SubscriptionBuilder {
        let builder: PagSeguroBuilder = new PagSeguroBuilder();
        builder.payment = EnumPayment.subscription;
        return new SubscriptionBuilder(builder, user);
    }
}
