"use strict";

import mongoose = require("mongoose");
import {IAddress, AddressSchema} from "./address_model";

/**
 * @enum
 * @readonly
 * @description Enumerador para os tipos de frete aceitos.
 */
export enum EnumShipping {
    pac = 1,
    sedex = 2,
    nao_especificado = 3
};

/**
 * @interface
 * @property {EnumShipping} type Tipo do frete.
 *                               1 - PAC, 2 - SEDEX, 3 - Não especificado.
 * @property {number} cost Custo do frete.
 *                         Valor entre 0,00 e 9.999.999,00.
 * @property {IAddress} address Dados do endereço de envio.
 * @description Dados do frete da compra.
 */
export interface IShipping extends mongoose.Document {
    type: EnumShipping;
    cost: number;
    address: IAddress;
};

/**
 * @description Tipo referente ao Mongoose para frete.
 */
export type MShipping = mongoose.Model<IShipping>;

export var ShippingSchema = {
    type: { type: "number", enum: [1,2,3], default: 3 },
    cost: { type: "number", min: [0.00, "A valor de frete deve ser maior que zero."], max: [9999999.00, "O valor de frete deve ser menor que 9.999.999,00"] },
    address: AddressSchema
};

/**
 * @class
 * @property {EnumShipping} type Tipo do frete.
 *                               1 - PAC, 2 - SEDEX, 3 - Não especificado.
 * @property {number} cost Custo do frete.
 *                         Valor entre 0,00 e 9.999.999,00.
 * @property {IAddress} address Dados do endereço de envio.
 * @description Dados do frete da compra.
 */
export var Shipping:MShipping = mongoose.model<IShipping>("Shipping",
    new mongoose.Schema(ShippingSchema));
