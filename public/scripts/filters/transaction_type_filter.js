"use strict";
angular.module("n4_payment")
    .filter("TransactionType", function () { return function (value) {
    switch (value) {
        case 1: return "Pagamento";
        case 11: return "Assinatura";
        default: return "Sem tipo";
    }
}; });
