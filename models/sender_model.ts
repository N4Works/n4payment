"use strict";

import * as mongoose from "mongoose";
import {IDocument} from "./document_model";
import {DocumentSchema} from "./document_model";
import {IPhone} from "./phone_model";
import {PhoneSchema} from "./phone_model";

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
    new mongoose.Schema({
        name: { type: "string", maxLength: 50 },
        email: { type: "string", lowercase: true, maxLength: 60 },
        phone: PhoneSchema,
        documents: [
            DocumentSchema
        ],
        bornDate: { type: "Date" }
    }));
