"use strict";

import mongoose = require("mongoose");

/**
 * @enum
 * @description Enumerador para o tipo do meio de pagamento.
 */
export enum EnumPaymentMethodType {
    cartao_de_credito = 1,
    boleto = 2,
    debito_online_tef = 3,
    saldo_pagseguro = 4,
    /**
     * @deprecated
     * @description Não disponivel para utilização.
     */
    oi_paggo = 5,
    deposito_em_conta = 6
}

export enum EnumPaymentMethodCode {
    cartao_de_credito_visa = 101,
    cartao_de_credito_master = 102,
    cartao_de_credito_american_express = 103,
    cartao_de_credito_diners = 104,
    cartao_de_credito_hipercard = 105,
    cartao_de_credito_aura = 106,
    cartao_de_credito_elo = 107,
    /**
     * @deprecated
     * @description Não disponivel para utilização.
     */
    cartao_de_credito_pelocard = 108,
    cartao_de_credito_personalcard = 109,
    cartao_de_credito_jcb = 110,
    cartao_de_credito_discover = 111,
    cartao_de_credito_brasilcard = 112,
    cartao_de_credito_fortbrasil = 113,
    /**
     * @deprecated
     * @description Não disponivel para utilização.
     */
    cartao_de_credito_cardban = 114,
    cartao_de_credito_valecard = 115,
    cartao_de_credito_cabal = 116,
    cartao_de_credito_mais = 117,
    cartao_de_credito_avista = 118,
    cartao_de_credito_grandcard = 119,
    cartao_de_credito_sorocred = 120,
    /**
     * @deprecated
     * @description Não disponivel para utilização.
     */
    boleto_bradesco = 201,
    boleto_santander = 202,
    debito_online_bradesco = 301,
    debito_online_itau = 302,
    /**
     * @deprecated
     * @description Não disponivel para utilização.
     */
    debito_online_unibanco = 303,
    debito_online_banco_do_brasil = 304,
    /**
     * @deprecated
     * @description Não disponivel para utilização.
     */
    debito_online_banco_real = 305,
    debito_online_banrisul = 306,
    debito_online_hsbc = 307,
    saldo_pagseguro = 401,
    /**
     * @deprecated
     * @description Não disponivel para utilização.
     */
    oi_paggo = 501,
    debito_em_conta_banco_do_brasil = 701,
    debito_em_conta_hsbc = 702
}

/**
 * @interface
 * @property {EnumPaymentMethodType} type Tipo do meio de pagamento utilizado pelo comprador.
 * @property {EnumPaymentMethodCode} code Código que identifica o meio de pagamento usado pelo comprador.
 *                                        O meio de pagamento descreve a bandeira de cartão de crédito utilizada
 *                                        ou banco escolhido para um débito online.
 * @description Meio de pagamento.
 */
export interface IPaymentMethod extends mongoose.Document {
    type: EnumPaymentMethodType;
    code: EnumPaymentMethodCode;
};

export var PaymentMethodSchema = {
    type: { type: "number" },
    code: { type: "number" }
};

/**
 * @class
 * @property {EnumPaymentMethodType} type Tipo do meio de pagamento utilizado pelo comprador.
 * @property {EnumPaymentMethodCode} code Código que identifica o meio de pagamento usado pelo comprador.
 *                                        O meio de pagamento descreve a bandeira de cartão de crédito utilizada
 *                                        ou banco escolhido para um débito online.
 * @description Meio de pagamento.
 */
export var PaymentMethod:mongoose.Model<IPaymentMethod> = mongoose.model<IPaymentMethod>("PaymentMethod", new mongoose.Schema(PaymentMethodSchema));
