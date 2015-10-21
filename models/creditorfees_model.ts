"use strict";

import * as mongoose from "mongoose";

/**
 * @interface
 * @property {number} intermediationRateAmount Valor da tarifa de intermediação dessa transação.
 *                                             Formato: Decimal, com duas casas decimais separadas por ponto ("."). Por exemplo, 1234.56.
 * @property {number} intermediationFeeAmount Valor da tarifa de intermediação dessa transação.
 *                                            Formato: Decimal, com duas casas decimais separadas por ponto ("."). Por exemplo, 1234.56.
 * @description Taxas do intermediador cobrada na transação.
 */
export interface ICreditorFees extends mongoose.Document {
    intermediationRateAmount: number;
    intermediationFeeAmount: number;
};

export var CreditorFeesSchema = {
    intermediationRateAmount: { type: "number" },
    intermediationFeeAmount: { type: "number" }
};

/**
 * @class
 * @property {number} intermediationRateAmount Valor da tarifa de intermediação dessa transação.
 *                                             Formato: Decimal, com duas casas decimais separadas por ponto ("."). Por exemplo, 1234.56.
 * @property {number} intermediationFeeAmount Valor da taxa de intermediação dessa transação.
 *                                            Formato: Decimal, com duas casas decimais separadas por ponto ("."). Por exemplo, 1234.56.
 * @description Taxas do intermediador cobrada na transação.
 */
export var CreditorFees:mongoose.Model<ICreditorFees> = mongoose.model<ICreditorFees>("CreditorFees", new mongoose.Schema(CreditorFeesSchema));
