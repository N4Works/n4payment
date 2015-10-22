"use strict";
var EnumTransactionType;
(function (EnumTransactionType) {
    EnumTransactionType[EnumTransactionType["payment"] = 1] = "payment";
    EnumTransactionType[EnumTransactionType["subscription"] = 11] = "subscription";
})(EnumTransactionType || (EnumTransactionType = {}));
var EnumTransactionStatus;
(function (EnumTransactionStatus) {
    EnumTransactionStatus[EnumTransactionStatus["aguardando_pagamento"] = 1] = "aguardando_pagamento";
    EnumTransactionStatus[EnumTransactionStatus["em_analise"] = 2] = "em_analise";
    EnumTransactionStatus[EnumTransactionStatus["paga"] = 3] = "paga";
    EnumTransactionStatus[EnumTransactionStatus["disponivel"] = 4] = "disponivel";
    EnumTransactionStatus[EnumTransactionStatus["em_disputa"] = 5] = "em_disputa";
    EnumTransactionStatus[EnumTransactionStatus["devolvida"] = 6] = "devolvida";
    EnumTransactionStatus[EnumTransactionStatus["cancelada"] = 7] = "cancelada";
    EnumTransactionStatus[EnumTransactionStatus["chargeback_debitado"] = 8] = "chargeback_debitado";
    EnumTransactionStatus[EnumTransactionStatus["em_contestacao"] = 9] = "em_contestacao";
})(EnumTransactionStatus || (EnumTransactionStatus = {}));
;
var EnumTransactionCancellationSource = (function () {
    function EnumTransactionCancellationSource() {
    }
    EnumTransactionCancellationSource.internal = "INTERNAL";
    EnumTransactionCancellationSource.external = "EXTERNAL";
    return EnumTransactionCancellationSource;
})();
var TransactionModel = (function () {
    function TransactionModel(transactionData) {
        if (!!transactionData) {
            angular.extend(this, transactionData);
        }
        this.paymentMethod = new PaymentMethodModel(this.paymentMethod);
        this.creditorFees = new CreditorFeesModel(this.creditorFees);
        this.sender = new SenderModel(this.sender);
        this.shipping = new ShippingModel(this.shipping);
        this.items = !!this.items && this.items.length > 0 ? this.items.map(function (i) { return new ItemModel(i); }) : [new ItemModel()];
    }
    return TransactionModel;
})();
angular.module("n4_payment")
    .factory("TransactionModel", function () { return TransactionModel; });
