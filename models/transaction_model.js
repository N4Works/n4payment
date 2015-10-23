"use strict";
var mongoose = require("mongoose");
var paymentmethod_model_1 = require("./paymentmethod_model");
var creditorfees_model_1 = require("./creditorfees_model");
var item_model_1 = require("./item_model");
var shipping_model_1 = require("./shipping_model");
var sender_model_1 = require("./sender_model");
(function (EnumTransactionType) {
    EnumTransactionType[EnumTransactionType["payment"] = 1] = "payment";
    EnumTransactionType[EnumTransactionType["subscription"] = 11] = "subscription";
})(exports.EnumTransactionType || (exports.EnumTransactionType = {}));
var EnumTransactionType = exports.EnumTransactionType;
(function (EnumTransactionStatus) {
    EnumTransactionStatus[EnumTransactionStatus["aguardando_pagamento"] = 1] = "aguardando_pagamento";
    EnumTransactionStatus[EnumTransactionStatus["em_analise"] = 2] = "em_analise";
    EnumTransactionStatus[EnumTransactionStatus["paga"] = 3] = "paga";
    EnumTransactionStatus[EnumTransactionStatus["disponivel"] = 4] = "disponivel";
    EnumTransactionStatus[EnumTransactionStatus["em_disputa"] = 5] = "em_disputa";
    EnumTransactionStatus[EnumTransactionStatus["devolvida"] = 6] = "devolvida";
    EnumTransactionStatus[EnumTransactionStatus["cancelada"] = 7] = "cancelada";
    EnumTransactionStatus[EnumTransactionStatus["chargeback_debitado"] = 8] = "chargeback_debitado";
    EnumTransactionStatus[EnumTransactionStatus["em_contestacao"] = 9] = "em_contestacao";
})(exports.EnumTransactionStatus || (exports.EnumTransactionStatus = {}));
var EnumTransactionStatus = exports.EnumTransactionStatus;
;
var EnumTransactionCancellationSource = (function () {
    function EnumTransactionCancellationSource() {
    }
    EnumTransactionCancellationSource.internal = "INTERNAL";
    EnumTransactionCancellationSource.external = "EXTERNAL";
    return EnumTransactionCancellationSource;
})();
exports.EnumTransactionCancellationSource = EnumTransactionCancellationSource;
;
exports.TransactionSchema = new mongoose.Schema({
    date: { type: "Date" },
    code: { type: "string" },
    reference: { type: "string", maxLength: [200, "O código para referência interna deve ter até 200 carácteres."] },
    type: { type: "number", enum: [1, 11] },
    status: { type: "number", enum: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    cancellationSource: { type: "string", enum: ["INTERNAL", "EXTERNAL"] },
    lastEventDate: { type: "Date" },
    paymentMethod: paymentmethod_model_1.PaymentMethodSchema,
    grossAmount: { type: "number" },
    discountAmount: { type: "number" },
    netAmount: { type: "number" },
    escrowEndDate: { type: "Date" },
    extraAmount: { type: "number" },
    installmentCount: { type: "number" },
    creditorFees: creditorfees_model_1.CreditorFeesSchema,
    itemCount: { type: "number" },
    items: [
        item_model_1.ItemSchema
    ],
    sender: sender_model_1.SenderSchema,
    shipping: shipping_model_1.ShippingSchema,
});
exports.Transaction = mongoose.model("Transaction", exports.TransactionSchema);
