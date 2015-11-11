"use strict";

import mongoose = require("mongoose");

/**
 * @interface
 * @property {number} installmentFeeAmount Valor da taxa de parcelamento dessa transação.
 *                                         Formato: Decimal, com duas casas decimais separadas por ponto ("."). Por exemplo, 1234.56.
 * @property {number} operationalFeeAmount Valor da taxa de operação dessa transação.
 *                                         Formato: Decimal, com duas casas decimais separadas por ponto ("."). Por exemplo, 1234.56.
 * @property {number} intermediationRateAmount Valor da tarifa de intermediação dessa transação.
 *                                             Formato: Decimal, com duas casas decimais separadas por ponto ("."). Por exemplo, 1234.56.
 * @property {number} intermediationFeeAmount Valor da tarifa de intermediação dessa transação.
 *                                            Formato: Decimal, com duas casas decimais separadas por ponto ("."). Por exemplo, 1234.56.
 * @description Taxas do intermediador cobrada na transação.
 */
export interface ICreditorFees extends mongoose.Document {
    installmentFeeAmount: number;
    operationalFeeAmount: number;
    intermediationRateAmount: number;
    intermediationFeeAmount: number;
};

export var CreditorFeesSchema = {
    installmentFeeAmount: { type: "number" },
    operationalFeeAmount: { type: "number" },
    intermediationRateAmount: { type: "number" },
    intermediationFeeAmount: { type: "number" }
};

/**
 * @class
 * @property {number} installmentFeeAmount Valor da taxa de parcelamento dessa transação.
 *                                         Formato: Decimal, com duas casas decimais separadas por ponto ("."). Por exemplo, 1234.56.
 * @property {number} operationalFeeAmount Valor da taxa de operação dessa transação.
 *                                         Formato: Decimal, com duas casas decimais separadas por ponto ("."). Por exemplo, 1234.56.
 * @property {number} intermediationRateAmount Valor da tarifa de intermediação dessa transação.
 *                                             Formato: Decimal, com duas casas decimais separadas por ponto ("."). Por exemplo, 1234.56.
 * @property {number} intermediationFeeAmount Valor da tarifa de intermediação dessa transação.
 *                                            Formato: Decimal, com duas casas decimais separadas por ponto ("."). Por exemplo, 1234.56.
 * @description Taxas do intermediador cobrada na transação.
 */
export var CreditorFees:mongoose.Model<ICreditorFees> = mongoose.model<ICreditorFees>("CreditorFees", new mongoose.Schema(CreditorFeesSchema));
