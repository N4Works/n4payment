"use strict";

class TransactionsController {
    transaction: TransactionModel = new TransactionModel();
    transactions: Array<TransactionModel> = new Array<TransactionModel>();
    constructor(private resource: TransactionResource) {
        var self = this;
        resource.findAll()
            .then((transactions: Array<TransactionModel>) => self.transactions = transactions);
    }
}

angular.module("n4_payment")
    .controller("TransactionsController", [
    "TransactionResource",
    TransactionsController
]);
