/**
 * Enumerador para o ambiente/tipo de requisição que será realizada no PagSeguro.
 *
 * production: URL de produção.
 * development: URL para desenvolvimento, teste.
 */
export class EnumURLPagSeguro {
    static checkout_development: string = "https://ws.sandbox.pagseguro.uol.com.br/v2/checkout";
    static checkout_production: string = "https://ws.pagseguro.uol.com.br/v2/checkout";
    static payment_development: string = "https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html";
    static payment_production: string = "https://pagseguro.uol.com.br/v2/checkout/payment.html";
    static transaction_development: string = "https://ws.sandbox.pagseguro.uol.com.br/v3/transactions/";
    static transaction_production: string = "https://ws.pagseguro.uol.com.br/v3/transactions/";
    static transaction_notification_development: string = "https://ws.sandbox.pagseguro.uol.com.br/v3/transactions/notifications";
    static transaction_notification_production: string = "https://ws.pagseguro.uol.com.br/v3/transactions/notifications";
}
