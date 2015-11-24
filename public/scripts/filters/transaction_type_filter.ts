"use strict";

angular.module("n4_payment")
.filter("TransactionType", () => (value) => {
    switch (value) {
        case 1: return "Pagamento";
        case 11: return "Assinatura";
        default: return "Sem tipo";
    }
});
