"use strict";
var TransactionsController = (function () {
    function TransactionsController(resource) {
        this.resource = resource;
        this.transaction = new TransactionModel();
        this.transactions = new Array();
        var self = this;
        resource.findAll()
            .then(function (transactions) { return self.transactions = transactions; });
    }
    return TransactionsController;
})();
angular.module("n4_payment")
    .controller("TransactionsController", [
    "TransactionResource",
    TransactionsController
]);
