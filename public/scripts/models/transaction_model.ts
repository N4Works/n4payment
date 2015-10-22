"use strict";

enum EnumTransactionType {
    payment = 1,
    subscription = 11
}

enum EnumTransactionStatus {
    aguardando_pagamento = 1,
    em_analise = 2,
    paga = 3,
    disponivel = 4,
    em_disputa = 5,
    devolvida = 6,
    cancelada = 7,
    chargeback_debitado = 8,
    em_contestacao = 9
};

class EnumTransactionCancellationSource {
    static internal:string  = "INTERNAL";
    static external:string = "EXTERNAL";
}

class TransactionModel {
    _id: string;
    date: Date;
    code: string;
    reference: string;
    type: EnumTransactionType;
    status: EnumTransactionStatus;
    cancellationSource: EnumTransactionCancellationSource;
    lastEventDate: Date;
    paymentMethod: PaymentMethodModel;
    grossAmount: number;
    discountAmount: number;
    netAmount: number;
    escrowEndDate: Date;
    extraAmount: number;
    installmentCount: number;
    creditorFees: CreditorFeesModel;
    installmentFeeAmount: number;
    operationalFeeAmount: number;
    intermediationRateAmount: number;
    intermediationFeeAmount: number;
    itemCount: number;
    items: Array<ItemModel>;
    sender: SenderModel;
    shipping: ShippingModel;
    constructor(transactionData?:any) {
        if (!!transactionData) {
            angular.extend(this, transactionData);
        }
        this.paymentMethod = new PaymentMethodModel(this.paymentMethod);
        this.creditorFees = new CreditorFeesModel(this.creditorFees);
        this.sender = new SenderModel(this.sender);
        this.shipping = new ShippingModel(this.shipping);
        this.items = !!this.items && this.items.length > 0 ? this.items.map(i => new ItemModel(i)) : [ new ItemModel() ];
    }
}

angular.module("n4_payment")
.factory("TransactionModel", () => TransactionModel);
