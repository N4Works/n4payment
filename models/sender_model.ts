"use strict";

import mongoose = require("mongoose");
import {IDocument, DocumentSchema} from "./document_model";
import {IPhone, PhoneSchema} from "./phone_model";

/**
 * @interface
 * @property {string} name Nome do comprador.
 *                         Até 50 carácteres.
 * @property {string} email E-mail do comprador.
 *                          Até 60 carácteres.
 * @property phone {IPhone} Telefone do comprador.
 * @property {Array<IDocument>} documents Documentos do comprador.
 * @property {Date} bornDate Data de nascimento do comprador.
 *                           Formato dd/MM/yyyy.
 * @description Comprador.
 */
export interface ISender extends mongoose.Document {
    name: string;
    email: string;
    phone: IPhone;
    documents: Array<IDocument>;
    bornDate: Date;
};

/**
 * @description Definição do tipo referente ao Mongoose para comprador.
 */
export type MSender = mongoose.Model<ISender>;

export var SenderSchema = {
    name: { type: "string", maxLength: [50, "O nome do comprador deve ter no máximo 50 carácteres"] },
    email: { type: "string", lowercase: true, maxLength: [60, "O e-mail do comprador deve ter no máximo 60 carácteres."] },
    phone: PhoneSchema,
    documents: [
        DocumentSchema
    ],
    bornDate: { type: "Date" }
};

/**
 * @class
 * @property {string} name Nome do comprador.
 *                         Até 50 carácteres.
 * @property {string} email E-mail do comprador.
 *                          Até 60 carácteres.
 * @property phone {IPhone} Telefone do comprador.
 * @property {Array<IDocument>} documents Documentos do comprador.
 * @property {Date} bornDate Data de nascimento do comprador.
 *                           Formato dd/MM/yyyy.
 * @description Comprador.
 */
export var Sender:MSender = mongoose.model<ISender>("Sender",
    new mongoose.Schema(SenderSchema));
