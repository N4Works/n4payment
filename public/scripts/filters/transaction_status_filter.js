"use strict";
angular.module("n4_payment")
    .filter("TransactionStatus", function () { return function (value) {
    switch (value) {
        case 1: return "Aguardando pagamento";
        case 2: return "Em análise";
        case 3: return "Pago";
        case 4: return "Disponível";
        case 5: return "Em disputa";
        case 6: return "Devolvido";
        case 7: return "Cancelado";
        case 8: return "Valor devolvido";
        case 9: return "Em contestação";
        default: return "Sem status";
    }
}; });
