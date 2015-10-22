"use strict";
;
var TransactionResource = (function () {
    function TransactionResource($resource) {
        this.provider = $resource("/api/pagseguro/transactions/", {}, {});
    }
    TransactionResource.prototype.findAll = function () {
        return this.provider.query()
            .$promise
            .then(function (transactions) { return transactions.map(function (t) { return new TransactionModel(t); }); });
    };
    return TransactionResource;
})();
angular.module("n4_payment")
    .factory("TransactionResource", [
    "$resource",
    function ($resource) { return new TransactionResource($resource); }
]);
