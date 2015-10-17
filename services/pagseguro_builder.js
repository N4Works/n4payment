"use strict";
import * as pagseguroModel from "../models/pagseguro_model";
class SenderBuilder {
    constructor(builder, sender) {
        this.builder = builder;
        this.sender = sender;
    }
    withPhone(phone) {
        this.sender.phone = phone;
        return this;
    }
    withAddress(address) {
        this.sender.address = address;
        return this;
    }
    withDocument(document) {
        this.sender.documents.push(document);
        return this;
    }
    return() {
        return this.builder;
    }
}
class EnumURLPagSeguro {
}
EnumURLPagSeguro.development = "https://ws.sandbox.pagseguro.uol.com.br/v2/checkout";
EnumURLPagSeguro.production = "https://ws.pagseguro.uol.com.br/v2/checkout";
var EnumPayment;
(function (EnumPayment) {
    EnumPayment[EnumPayment["payment"] = 0] = "payment";
    EnumPayment[EnumPayment["subscription"] = 1] = "subscription";
})(EnumPayment || (EnumPayment = {}));
class PaymentBuilder {
    constructor(pagSeguroBuilder, user) {
        this.pagSeguroBuilder = pagSeguroBuilder;
        this.user = user;
        this.checkout = new pagseguroModel.Checkout();
        this.checkout.receiver = user;
    }
    to(sender) {
        this.checkout.sender = sender;
        return new SenderBuilder(this, sender);
    }
    return() {
        return this.pagSeguroBuilder;
    }
    send() {
        return new Promise((resolve, reject) => {
            return;
        });
    }
}
class SubscriptionBuilder {
    constructor(pagSeguroBuilder, user) {
        this.pagSeguroBuilder = pagSeguroBuilder;
        this.user = user;
    }
    return() {
        return this.pagSeguroBuilder;
    }
}
export class PagSeguroBuilder {
    constructor() {
        this.url = EnumURLPagSeguro.development;
        this.url = process.env.NODE_ENV === "production" ? EnumURLPagSeguro.production : EnumURLPagSeguro.development;
    }
    static createPaymentFor(user) {
        let builder = new PagSeguroBuilder();
        builder.payment = EnumPayment.payment;
        return new PaymentBuilder(builder, user);
    }
    static createSubscriptionFor(user) {
        let builder = new PagSeguroBuilder();
        builder.payment = EnumPayment.subscription;
        return new SubscriptionBuilder(builder, user);
    }
}
