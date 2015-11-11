"use strict";

import mongoose = require("mongoose");

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

export var AddressSchema = {
    street: { type: "string", maxLength: [80, "A rua do endereço deve ter no máximo 80 carácteres."] },
    number: { type: "string", maxLength: [20, "O número do endereço deve ter no máximo 20 carácteres."] },
    postalCode: { type: "string", match: [/^\d{8}$/, "O código postal deve ser composto por 8 digitos."]  },
    city: { type: "string", minLength: [2, "A cidade deve ter no mínimo 2 carácteres."], maxLength: [60, "A cidade deve ter no máximo 60 carácteres"] },
    state: { type: "string", match: [/^[A-Z]{2}$/, "O estado deve ser composto por duas letras maiusculas."] },
    country: { type: "string", default: "BRA", match: [/^BRA$/, "Somente é aceito \"BRA\" como país."] },
    complement: { type: "string", maxLength: [40, "O complemento deve ter no máximo 40 carácteres."] },
    district: { type: "string", maxLength: [60, "O bairro deve ter no máximo 60 carácteres."] }
};

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
    new mongoose.Schema(AddressSchema));
