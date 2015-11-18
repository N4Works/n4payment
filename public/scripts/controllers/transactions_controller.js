"use strict";
var TransactionsController = (function () {
    function TransactionsController(resource, notificationsService) {
        this.resource = resource;
        this.notificationsService = notificationsService;
        this.transaction = new TransactionModel();
        this.transactions = new Array();
        var self = this;
        resource.findAll()
            .then(function (transactions) { return self.transactions = transactions; })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    }
    return TransactionsController;
})();
angular.module("n4_payment")
    .controller("TransactionsController", [
    "TransactionResource",
    "n4NotificationsService",
    TransactionsController
]);
