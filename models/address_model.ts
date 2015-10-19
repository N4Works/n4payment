"use strict";

import * as mongoose from "mongoose";

/**
 * @interface
 * @property {string} street Logradouro do endereço.
 *                           Até 80 carácteres.
 * @property {string} number Número do endereço.
 *                           Até 20 carácteres.
 * @property {string} postalCode Código postal do endereço.
 *                               8 carácteres.
 * @property {string} city Cidade do endereço.
 *                         De 2 à 60 carácteres.
 * @property {string} state Estado do endereço.
 *                          Até dois carácteres.
 *                          Uppercase.
 * @property {string} country País do endereço.
 *                            Somente "BRA" é aceito.
 * @property {string} complement Complemento do endereço.
 *                               Até 40 carácteres.
 * @property {string} district Bairro do endereço.
 *                             Até 60 carácteres.
 * @description Endereço referente ao frete ou comprador.
 */
export interface IAddress extends mongoose.Document {
    street: string;
    number: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    complement: string;
    district: string;
};

/**
 * @description Definição do tipo referente ao Mongoose para Usuário.
 */
export type MAddress = mongoose.Model<IAddress>;

/**
 * @class
 * @property {string} street Logradouro do endereço.
 *                           Até 80 carácteres.
 * @property {string} number Número do endereço.
 *                           Até 20 carácteres.
 * @property {string} postalCode Código postal do endereço.
 *                               8 carácteres.
 * @property {string} city Cidade do endereço.
 *                         De 2 à 60 carácteres.
 * @property {string} state Estado do endereço.
 *                          Até dois carácteres.
 *                          Uppercase.
 * @property {string} country País do endereço.
 *                            Somente "BRA" é aceito.
 * @property {string} complement Complemento do endereço.
 *                               Até 40 carácteres.
 * @property {string} district Bairro do endereço.
 *                             Até 60 carácteres.
 * @description Endereço referente ao frete ou comprador.
 */
export var Address:MAddress = mongoose.model<IAddress>("Address",
    new mongoose.Schema({
        street: { type: "string", maxLength: 80 },
        number: { type: "string", maxLength: 20 },
        postalCode: { type: "string", match: /\^d{8}$/ },
        city: { type: "string", minLength: 2, maxLength: 60 },
        state: { type: "string", match: /^[A-Z]{2}$/ },
        country: { type: "string", default: "BRA", match: /ˆBRA$/ },
        complement: { type: "string", maxLength: 40 },
        district: { type: "string", maxLength: 60 }
    }));
