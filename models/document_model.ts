"use strict";

import * as mongoose from "mongoose";

/**
 * @interface
 * @property {string} type Tipo do documento do comprador.
 *                         Somente o valor "CPF" é aceito.
 * @property {string } value Valor referente ao documento.
 *                           Número de 11 dígitos.
 * @description Documento do comprador.
 */
export interface IDocument extends mongoose.Document {
    type: string;
    value: string;
};

/**
 * @description Definição referente ao Mongoose para documento.
 */
export type MDocument = mongoose.Model<IDocument>;

/**
 * @description Definição do esquema para o Mongoose.
 */
export var DocumentSchema = {
    type: { type: "string", enum: [ "CPF" ] },
    value: { type: "string", match: /^\d{11}$/ }
};

/**
 * @class
 * @property {string} type Tipo do documento do comprador.
 *                         Somente o valor "CPF" é aceito.
 * @property {string } value Valor referente ao documento.
 *                           Número de 11 dígitos.
 * @description Documento do comprador.
 */
export var Document:MDocument = mongoose.model<IDocument>("Document",
    new mongoose.Schema(DocumentSchema));
