var EnumURLPagSeguro = (function () {
    function EnumURLPagSeguro() {
    }
    EnumURLPagSeguro.checkout_development = "https://ws.sandbox.pagseguro.uol.com.br/v2/checkout";
    EnumURLPagSeguro.checkout_production = "https://ws.pagseguro.uol.com.br/v2/checkout";
    EnumURLPagSeguro.payment_development = "https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html";
    EnumURLPagSeguro.payment_production = "https://pagseguro.uol.com.br/v2/checkout/payment.html";
    EnumURLPagSeguro.transaction_development = "https://ws.sandbox.pagseguro.uol.com.br/v3/transactions/notifications";
    EnumURLPagSeguro.transaction_production = "https://ws.pagseguro.uol.com.br/v3/transactions/notifications";
    return EnumURLPagSeguro;
})();
exports.EnumURLPagSeguro = EnumURLPagSeguro;
