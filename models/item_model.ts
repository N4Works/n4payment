"use strict";

import mongoose = require("mongoose");

/**
 * @interface
 * @property {string} id Código ou identificador do produto.
 *                       Até 100 carácteres.
 *                       Campo obrigatório.
 * @property {string} description Descrição do produto.
 *                                Até 100 carácteres.
 *                                Campo obrigatório.
 * @property {number} amount Valor do produto.
 *                           Valor entre 0,00 e 9.999.999,00.
 *                           Campo obrigatório.
 * @property {number} quantity Quantidade do item.
 *                             Valor entre 1 e 999.
 *                             Campo obrigatório.
 * @property {number} shippingCost Valor do frete para o produto.
 *                                 Valor entre 0,00 e 9.999.999,00.
 * @property {number} weight Peso do produto em gramas.
 *                           A soma dos pesos não pode ser superior a 30Kg.
 * @description Item da compra.
 */
export interface IItem extends mongoose.Document {
    id: string;
    description: string;
    amount: number;
    quantity: number;
    shippingCost: number;
    weight: number;
};

/**
 * @description Definição do tipo referente ao Mongoose para item.
 */
export type MItem = mongoose.Model<IItem>;

/**
 * @description Definição do esquema para o Mongoose.
 */
export var ItemSchema = {
    id: { type: "string", required: true, maxLength: 100 },
    description: { type: "string", required: true, maxLength: 100 },
    amount: { type: "number", required: true, min: 0, max: 9999999 },
    quantity: { type: "number", required: true, min: 1, max: 999 },
    shippingCost: { type: "number", min: 0, max: 9999999 },
    weight: "number"
};

/**
 * @class
 * @property {string} id Código ou identificador do produto.
 *                       Até 100 carácteres.
 *                       Campo obrigatório.
 * @property {string} description Descrição do produto.
 *                                Até 100 carácteres.
 *                                Campo obrigatório.
 * @property {number} amount Valor do produto.
 *                           Valor entre 0,00 e 9.999.999,00.
 *                           Campo obrigatório.
 * @property {number} quantity Quantidade do item.
 *                             Valor entre 1 e 999.
 *                             Campo obrigatório.
 * @property {number} shippingCost Valor do frete para o produto.
 *                                 Valor entre 0,00 e 9.999.999,00.
 * @property {number} weight Peso do produto em gramas.
 *                           A soma dos pesos não pode ser superior a 30Kg.
 * @description Item da compra.
 */
export var Item:MItem = mongoose.model<IItem>("Item",
    new mongoose.Schema(ItemSchema));
