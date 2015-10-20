"use strict";

import * as mongoose from "mongoose";

/**
 * @interface
 * @property {string} areaCode Código de área (DDD).
 *                             Até 2 dígitos.
 * @property {string} number Número de telefone.
 *                           De 7 à 9 dígitos.
 * @description Telefone do comprador.
 */
export interface IPhone extends mongoose.Document {
    areaCode: string;
    number: string;
};

export var PhoneSchema = {
    areaCode: { type: "string", match: /^\d{2}$/ },
    number: { type: "string", match: /^\d{7,9}$/ }
};

/**
 * @class
 * @property {string} areaCode Código de área (DDD).
 *                             Até 2 dígitos.
 * @property {string} number Número de telefone.
 *                           De 7 à 9 dígitos.
 * @description Telefone do comprador.
 */
export var Phone:mongoose.Model<IPhone> = mongoose.model<IPhone>("Phone", new mongoose.Schema(PhoneSchema));
