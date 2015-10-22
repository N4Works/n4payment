"use strict";

enum EnumPaymentMethodType {
    cartao_de_credito = 1,
    boleto = 2,
    debito_online_tef = 3,
    saldo_pagseguro = 4,
    deposito_em_conta = 6
}

enum EnumPaymentMethodCode {
    cartao_de_credito_visa = 101,
    cartao_de_credito_master = 102,
    cartao_de_credito_american_express = 103,
    cartao_de_credito_diners = 104,
    cartao_de_credito_hipercard = 105,
    cartao_de_credito_aura = 106,
    cartao_de_credito_elo = 107,
    cartao_de_credito_personalcard = 109,
    cartao_de_credito_jcb = 110,
    cartao_de_credito_discover = 111,
    cartao_de_credito_brasilcard = 112,
    cartao_de_credito_fortbrasil = 113,
    cartao_de_credito_valecard = 115,
    cartao_de_credito_cabal = 116,
    cartao_de_credito_mais = 117,
    cartao_de_credito_avista = 118,
    cartao_de_credito_grandcard = 119,
    cartao_de_credito_sorocred = 120,
    boleto_santander = 202,
    debito_online_bradesco = 301,
    debito_online_itau = 302,
    debito_online_banco_do_brasil = 304,
    debito_online_banrisul = 306,
    debito_online_hsbc = 307,
    saldo_pagseguro = 401,
    debito_em_conta_banco_do_brasil = 701,
    debito_em_conta_hsbc = 702
}

class PaymentMethodModel {
    type: EnumPaymentMethodType;
    code: EnumPaymentMethodCode;
    constructor(paymentMethodData?:any) {
        angular.extend(this, paymentMethodData);
    }
}

angular.module("n4_payment")
.factory("PaymentMethodModel", () => PaymentMethodModel);
