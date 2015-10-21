"use strict";
var mongoose = require("mongoose");
(function (EnumPaymentMethodType) {
    EnumPaymentMethodType[EnumPaymentMethodType["cartao_de_credito"] = 1] = "cartao_de_credito";
    EnumPaymentMethodType[EnumPaymentMethodType["boleto"] = 2] = "boleto";
    EnumPaymentMethodType[EnumPaymentMethodType["debito_online_tef"] = 3] = "debito_online_tef";
    EnumPaymentMethodType[EnumPaymentMethodType["saldo_pagseguro"] = 4] = "saldo_pagseguro";
    EnumPaymentMethodType[EnumPaymentMethodType["oi_paggo"] = 5] = "oi_paggo";
    EnumPaymentMethodType[EnumPaymentMethodType["deposito_em_conta"] = 6] = "deposito_em_conta";
})(exports.EnumPaymentMethodType || (exports.EnumPaymentMethodType = {}));
var EnumPaymentMethodType = exports.EnumPaymentMethodType;
(function (EnumPaymentMethodCode) {
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_visa"] = 101] = "cartao_de_credito_visa";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_master"] = 102] = "cartao_de_credito_master";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_american_express"] = 103] = "cartao_de_credito_american_express";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_diners"] = 104] = "cartao_de_credito_diners";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_hipercard"] = 105] = "cartao_de_credito_hipercard";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_aura"] = 106] = "cartao_de_credito_aura";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_elo"] = 107] = "cartao_de_credito_elo";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_pelocard"] = 108] = "cartao_de_credito_pelocard";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_personalcard"] = 109] = "cartao_de_credito_personalcard";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_jcb"] = 110] = "cartao_de_credito_jcb";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_discover"] = 111] = "cartao_de_credito_discover";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_brasilcard"] = 112] = "cartao_de_credito_brasilcard";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_fortbrasil"] = 113] = "cartao_de_credito_fortbrasil";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_cardban"] = 114] = "cartao_de_credito_cardban";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_valecard"] = 115] = "cartao_de_credito_valecard";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_cabal"] = 116] = "cartao_de_credito_cabal";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_mais"] = 117] = "cartao_de_credito_mais";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_avista"] = 118] = "cartao_de_credito_avista";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_grandcard"] = 119] = "cartao_de_credito_grandcard";
    EnumPaymentMethodCode[EnumPaymentMethodCode["cartao_de_credito_sorocred"] = 120] = "cartao_de_credito_sorocred";
    EnumPaymentMethodCode[EnumPaymentMethodCode["boleto_bradesco"] = 201] = "boleto_bradesco";
    EnumPaymentMethodCode[EnumPaymentMethodCode["boleto_santander"] = 202] = "boleto_santander";
    EnumPaymentMethodCode[EnumPaymentMethodCode["debito_online_bradesco"] = 301] = "debito_online_bradesco";
    EnumPaymentMethodCode[EnumPaymentMethodCode["debito_online_itau"] = 302] = "debito_online_itau";
    EnumPaymentMethodCode[EnumPaymentMethodCode["debito_online_unibanco"] = 303] = "debito_online_unibanco";
    EnumPaymentMethodCode[EnumPaymentMethodCode["debito_online_banco_do_brasil"] = 304] = "debito_online_banco_do_brasil";
    EnumPaymentMethodCode[EnumPaymentMethodCode["debito_online_banco_real"] = 305] = "debito_online_banco_real";
    EnumPaymentMethodCode[EnumPaymentMethodCode["debito_online_banrisul"] = 306] = "debito_online_banrisul";
    EnumPaymentMethodCode[EnumPaymentMethodCode["debito_online_hsbc"] = 307] = "debito_online_hsbc";
    EnumPaymentMethodCode[EnumPaymentMethodCode["saldo_pagseguro"] = 401] = "saldo_pagseguro";
    EnumPaymentMethodCode[EnumPaymentMethodCode["oi_paggo"] = 501] = "oi_paggo";
    EnumPaymentMethodCode[EnumPaymentMethodCode["debito_em_conta_banco_do_brasil"] = 701] = "debito_em_conta_banco_do_brasil";
    EnumPaymentMethodCode[EnumPaymentMethodCode["debito_em_conta_hsbc"] = 702] = "debito_em_conta_hsbc";
})(exports.EnumPaymentMethodCode || (exports.EnumPaymentMethodCode = {}));
var EnumPaymentMethodCode = exports.EnumPaymentMethodCode;
;
exports.PaymentMethodSchema = {
    type: { type: "number" },
    code: { type: "number" }
};
exports.PaymentMethod = mongoose.model("PaymentMethod", new mongoose.Schema(exports.PaymentMethodSchema));
