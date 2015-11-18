"use strict";

class TransactionsController {
    transaction: TransactionModel = new TransactionModel();
    transactions: Array<TransactionModel> = new Array<TransactionModel>();
    constructor(private resource: TransactionResource,
        private notificationsService: n4Notifications.N4NotificationsService) {
        var self = this;
        resource.findAll()
            .then((transactions: Array<TransactionModel>) => self.transactions = transactions)
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));
    }
}

angular.module("n4_payment")
    .controller("TransactionsController", [
    "TransactionResource",
    "n4NotificationsService",
    TransactionsController
]);
