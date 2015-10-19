"use strict";

import * as mongoose from "mongoose";

/**
 * @interface
 * @property {number} areaCode Código de área (DDD).
 *                             Até 2 dígitos.
 * @property {string} number Número de telefone.
 *                           De 7 à 9 dígitos.
 * @description Telefone do comprador.
 */
export interface IPhone extends mongoose.Document {
    areaCode: number;
    number: string;
};

/**
 * @description Definição do tipo referente ao Mongoose para Telefone.
 */
export type MPhone = mongoose.Model<IPhone>;

/**
 * @class
 * @property {number} areaCode Código de área (DDD).
 *                             Até 2 dígitos.
 * @property {string} number Número de telefone.
 *                           De 7 à 9 dígitos.
 * @description Telefone do comprador.
 */
export var Phone:MPhone = mongoose.model<IPhone>("Phone",
    new mongoose.Schema({
        areaCode: { type: "string", match: /^\d{2}$/ },
        number: { type: "string", match: /^\d{7,9}$/ }
    }));
