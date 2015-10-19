"use strict";

import * as mongoose from "mongoose";
import * as user from "./user_model";

/** ============================================================================
Informações do comprador
================================================================================*/

/**
 * @description Interface para o endereço referente ao frete ou comprador.
 * @param street string: Logradouro do endereço.
 *         Até 80 carácteres.
 * @param number: Número do endereço.
 *         Até 20 carácteres.
 * @param postalCode: Código postal do endereço.
 *             8 carácteres.
 * @param city: Cidade do endereço.
 *       De 2 à 60 carácteres.
 * @param state: Estado do endereço.
 *        Até dois carácteres.
 *        Uppercase.
 * country: País do endereço.
 *          Somente "BRA" é aceito.
 * complement: Complemento do endereço.
 *             Até 40 carácteres.
 * district: Bairro do endereço.
 *           Até 60 carácteres.
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
 * Tipo User para mongoose.
 */
export type MAddress = mongoose.Model<IAddress>;

/**
 * Modelo de endereço.
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

/**
 * Interface de telefone.
 *
 * areaCode: Código de área (DDD).
 *           Até 2 dígitos.
 * number: Número de telefone.
 *         De 7 à 9 dígitos.
 */
export interface IPhone extends mongoose.Document {
    areaCode: number;
    number: string;
};

/**
 * Tipo Phone para mongoose.
 */
export type MPhone = mongoose.Model<IPhone>;

/**
 * Modelo de telefone.
 */
export var Phone:MPhone = mongoose.model<IPhone>("Phone",
    new mongoose.Schema({
        areaCode: { type: "string", match: /^\d{2}$/ },
        number: { type: "string", match: /^\d{7,9}$/ }
    }));

/**
 * Interface para os dados referentes ao documento do comprador.
 *
 * type: Tipo do documento do comprador.
 *       Somente o valor "CPF" é aceito.
 * value: Valor referente ao documento.
 *        Número de 11 dígitos.
 */
export interface IDocument extends mongoose.Document {
    type: string;
    value: string;
};

/**
 * Tipo Document para mongoose.
 */
export type MDocument = mongoose.Model<IDocument>;

/**
 * Modelo de documento.
 */
export var Document:MDocument = mongoose.model<IDocument>("Document",
    new mongoose.Schema({
        type: { type: "string", enum: [ "CPF" ] },
        value: { type: "string", match: /^\d{11}$/ }
    }));

/**
 * Interface referente ao comprador.
 *
 * name: Nome do comprador.
 *       Até 50 carácteres.
 * email: E-mail do comprador.
 *        E-mail.
 *        Até 60 carácteres.
 * phone: Dados do telefone do comprador.
 * documents: Documentos do comprador.
 * bornDate: Data de nascimento do comprador.
 *           Formato dd/MM/yyyy.

 * address: Dados do endereço do comprador.
 */
export interface ISender extends mongoose.Document {
    name: string;
    email: string;
    phone: IPhone;
    documents: Array<IDocument>;
    bornDate: Date;
    address: IAddress;
};

/**
 * Tipo Sender para mongoose.
 */
export type MSender = mongoose.Model<ISender>;

/**
 * Modelo de comprador.
 */
export var Sender:MSender = mongoose.model<ISender>("Sender",
    new mongoose.Schema({
        name: { type: "string", maxLength: 50 },
        email: { type: "string", lowercase: true, maxLength: 60 },
        phone: { type: mongoose.Schema.Types.ObjectId, ref: "Phone" },
        documents: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
        bornDate: { type: "Date" },
        address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" }
    }));

/**
 * Interface para o item sendo adquirido.
 *
 * id: Código ou identificador do produto.
 *     Até 100 carácteres.
 *     Obrigatório.
 * description: Descrição do produto.
 *              Até 100 carácteres.
 *              Obrigatório.
 * amount: Valor do produto.
 *         Número.
 *         Valor entre 0,00 e 9.999.999,00.
 *         Obrigatório.
 * quantity: Quantidade do produto.
 *           Número.
 *           Valor entre 1 e 999.
 *           Obrigatório.
 * shippingCost: Valor do frete para o produto.
 *               Número.
 *               Valor entre 0,00 e 9.999.999,00.
 * weight: Peso do produto.
 *         Número.
 *         Em gramas.
 *         A soma dos pesos não pode ser superior a 30Kg.
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
 * Tipo Item para mongoose.
 */
export type MItem = mongoose.Model<IItem>;

/**
 * Modelo de item.
 */
export var Item:MItem = mongoose.model<IItem>("Item", new mongoose.Schema({
    id: { type: "string", required: true, maxLength: 100 },
    description: { type: "string", required: true, maxLength: 100 },
    amount: { type: "number", required: true, min: 0, max: 9999999 },
    quantity: { type: "number", required: true, min: 1, max: 999 },
    shippingCost: { type: "number", min: 0, max: 9999999 },
    weight: "number"
}));

/**
 * Enumerador para os tipos de frete aceitos.
 */
export enum EnumShipping {
    pac = 1,
    sedex = 2,
    nao_especificado = 3
};

/**
 * Interface referente ao frete.
 *
 * type: Tipo do frete.
 *       1 - PAC, 2 - SEDEX, 3 - Não especificado.
 *       Número de acordo com lista acima.
 * cost: Custo do frete.
 *       Número.
 *       Valor entre 0,00 e 9.999.999,00.
 * address: Dados do endereço de envio.
 */
export interface IShipping extends mongoose.Document {
    type: EnumShipping;
    cost: Number;
};

/**
 * Tipo Shipping para mongoose.
 */
export type MShipping = mongoose.Model<IShipping>;

/**
 * Modelo de frete.
 */
export var Shipping:MShipping = mongoose.model<IShipping>("Shipping",
    new mongoose.Schema({
        type: { type: "number", enum: [1,2,3], default: 3 },
        cost: { type: "number", min: 0, max: 9999999 }
    }));

/**
 * Enumerador de moeda.
 */
export class EnumCurrency {
    static real: string = "BRL";
};

/**
 * Interface referente a compra.
 *
 * currency: Moeda que o pagamento será feito.
 *           Aceita apenas "BRL".
 * reference: Código da transação no sistema de retaguarda.
 *            Até 200 carácteres.
 * sender: Dados do comprador.
 * shipping: Dados do frete.
 * extraAmount: Acréscimo ou desconto.
 *              Valor entre -9.999.999,00 e 9.999.999,00.
 *              Esse valor não pode ser inferior a soma dos produtos.
 * redirectURL: URL para a qual o comprador será redirecionado após o final do fluxo de pagamento.
 *              URL.
 *              Até 255 carácteres.
 * notificationURL: URL para a qual o PagSeguro enviará os códigos de notificação relacionados ao pagamento.
 * Toda vez que houver uma mudança no status da transação e que demandar sua atenção, uma nova notificação
 * será enviada para este endereço.
 *              URL.
 *              Até 255 carácteres.
 * maxUses: Número máximo de usos para o código de pagamento.
 * Determina o número máximo de vezes que o código de pagamento criado pela chamada à API de Pagamentos poderá
 * ser usado. Este parâmetro pode ser usado como um controle de segurança.
 *          Número.
 *          Valor de 0 até 999.
 * maxAge: Prazo de validade do código de pagamento.
 * Determina o prazo (em segundos) durante o qual o código de pagamento criado pela chamada à API de Pagamentos
 * poderá ser usado. Este parâmetro pode ser usado como um controle de segurança.
 *         Número.
 *         Valor de 30 até 999999999
 * metadata: Metadados da transação. Permite adicionar informações extras, agrupadas ou não, em sua requisição de pagamento.
 *           Não implementado.
 */
export interface ICheckout extends mongoose.Document {
    receiver: user.IUser;
    currency: string;
    items: Array<IItem>;
    reference: string;
    sender: ISender;
    shipping: IShipping;
    extraAmount: number;
    redirectURL: string;
    notificationURL: string;
    maxUses: number;
};

/**
 * Tipo Checkout para mongoose.
 */
export type MCheckout = mongoose.Model<ICheckout>;

/**
 * Modelo de compra.
 */
export var Checkout:mongoose.Model<ICheckout> = mongoose.model<ICheckout>("Checkout", new mongoose.Schema({
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    currency: { type: "string", enum: [ "BRL" ], required: true },
    items: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
    reference: { type: "string", maxLength: 200 },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "Sender" },
    shipping:{ type: mongoose.Schema.Types.ObjectId, ref: "Shipping" },
    extraAmount: { type: "extraAmount", min: -9999999, max: 9999999 },
    redirectURL: { type: "string", maxLength: 255 },
    notificationURL: { type: "string", maxLength: 255 },
    maxUses: { type: "number", min: 0, max: 999 }
}));

/**
 * Interface para resposta de sucesso para requisição de compra.
 *
 * code: Código identificador do pagamento criado.
 *       32 carácteres.
 * date: Data de criação do pagamento.
 *       Formato YYYY-MM-DDThh:mm:ss.sTZD, o formato oficial do W3C para datas.
 */
export interface ICheckoutResponse {
    code: string;
    date: Date;
};

/**
 * Interface para objeto de erro na requisição de compra.
 *
 * code: Código de erro.
 *       Número.
 * message: Mensagem de erro.
 */
export interface ICheckoutError {
    code: number;
    message: string;
};

/**
 * Interface para reposta de erro na requisição de checkout.
 *
 * errors: Lista de erros.
 */
export interface ICheckoutResponseError {
    errors: Array<ICheckoutError>;
};
