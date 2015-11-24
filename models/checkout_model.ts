"use strict";

import mongoose = require("mongoose");
import {ISender} from "./sender_model";
import {IDocument} from "./document_model";
import {IItem, ItemSchema} from "./item_model";
import {ShippingSchema, IShipping} from "./shipping_model";
import {IUser} from "./user_model";

/**
 * @enum
 * @readonly
 * @description Enumerador de moeda.
 */
export class EnumCurrency {
    static real: string = "BRL";
};

/**
 * @interface
 * @property {EnumCurrency} currency Moeda que o pagamento será feito.
 *                                   Aceita apenas "BRL".
 * @property {string} reference Código da transação no sistema de retaguarda.
 *                              Até 200 carácteres.
 * @property {ISender} sender Dados do comprador.
 * @property {IShipping} shipping Dados do frete.
 * @property {number} extraAmount Acréscimo ou desconto.
 *                                Valor entre -9.999.999,00 e 9.999.999,00.
 *                                Esse valor não pode ser inferior a soma dos produtos.
 * @property {string} redirectURL URL para a qual o comprador será redirecionado após o final do fluxo de pagamento.
 *                                Até 255 carácteres.
 * @property {string} notificationURL URL para a qual o PagSeguro enviará os códigos de notificação relacionados ao pagamento.
 *                                    Toda vez que houver uma mudança no status da transação e que demandar sua atenção, uma
 *                                    nova notificação será enviada para este endereço.
 *                                    Até 255 carácteres.
 * @property {number} maxUses Número máximo de usos para o código de pagamento.
 *                            Determina o número máximo de vezes que o código de pagamento criado pela
 *                            chamada à API de Pagamentos poderá ser usado.
 *                            Esse parâmetro pode ser usado como um controle de segurança.
 *                            Valor de 0 até 999.
 * @property {number} maxAge Prazo de validade do código de pagamento.
 *                           Determina o prazo (em segundos) durante o qual o código de pagamento criado pela
 *                           chamada à API de Pagamentos poderá ser usado.
 *                           Esse parâmetro pode ser usado como um controle de segurança.
 *                           Valor de 30 até 999999999
 * @property {any} metadata Metadados da transação.
 *                          Permite adicionar informações extras, agrupadas ou não, em sua requisição de pagamento.
 *                          Não implementado.
 * @property {Date} sentDate Data de envio ao PagSeguro.
 * @description Compra.
 */
export interface ICheckout extends mongoose.Document {
    receiver: IUser;
    currency: string;
    items: Array<IItem>;
    reference: string;
    sender: ISender;
    shipping: IShipping;
    extraAmount: number;
    redirectURL: string;
    notificationURL: string;
    maxUses: number;
    maxAge: number;
    sentDate: Date;
};

/**
 * @description Definição do tipo referente ao Mongoose para compra.
 */
export type MCheckout = mongoose.Model<ICheckout>;

export var CheckoutSchema:mongoose.Schema = new mongoose.Schema({
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    currency: { type: "string", enum: [ "BRL" ], required: true },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true
    }],
    reference: { type: "string", maxLength: 200 },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "Sender" },
    shipping: ShippingSchema,
    extraAmount: { type: "number", min: -9999999, max: 9999999 },
    redirectURL: { type: "string", maxLength: 255 },
    notificationURL: { type: "string", maxLength: 255 },
    maxUses: { type: "number", min: 0, max: 999, default: 10 },
    maxAge: { type: "number", min: 30, max: 999999999, default: 120 },
    sentDate: { type: "Date" }
});

CheckoutSchema.static("toPagSeguro", (checkout: ICheckout):any => {
    var data:any = {
        checkout: {
            currency: checkout.currency,
            reference: checkout.reference,
            redirectURL: checkout.receiver.redirectURL,
            notificationURL: checkout.receiver.notificationURL,
            maxUses: checkout.maxUses,
            maxAge: checkout.maxAge,
            sender: {
                name: checkout.sender.name,
                email: checkout.sender.email,
                bornDate: checkout.sender.bornDate.toISOString().replace(/^(\d{4})-(\d{2})-(\d{2}).*$/, "$3/$2/$1"),
                phone: {
                    areaCode: checkout.sender.phone.areaCode,
                    number: checkout.sender.phone.number
                },
                documents: checkout.sender.documents.map((d: IDocument) => {
                    return {
                        document: {
                            type: d.type,
                            value: d.value
                        }
                    };
                })
            },
            items: checkout.items.map((i: IItem) => {
                return {
                    item: {
                        id: i.id,
                        description: i.description,
                        amount: i.amount.toFixed(2),
                        quantity: i.quantity.toFixed(0),
                        shippingCost: i.shippingCost.toFixed(2),
                        weight: i.weight.toFixed(0)
                    }
                };
            })
        }
    };

    /*
    if (checkout.shipping) {
        data.checkout.shipping = {
            type: checkout.shipping.type,
            cost: checkout.shipping.cost.toFixed(2),
            address: {
                street: checkout.shipping.address.street,
                number: checkout.shipping.address.number,
                postalCode: checkout.shipping.address.postalCode,
                city: checkout.shipping.address.city,
                state: checkout.shipping.address.state,
                country: checkout.shipping.address.country,
                complement: checkout.shipping.address.complement,
                district: checkout.shipping.address.district
            }
        };
    }*/

    return data;
});

/**
 * @class
 * @property {EnumCurrency} currency Moeda que o pagamento será feito.
 *                                   Aceita apenas "BRL".
 * @property {string} reference Código da transação no sistema de retaguarda.
 *                              Até 200 carácteres.
 * @property {ISender} sender Dados do comprador.
 * @property {IShipping} shipping Dados do frete.
 * @property {number} extraAmount Acréscimo ou desconto.
 *                                Valor entre -9.999.999,00 e 9.999.999,00.
 *                                Esse valor não pode ser inferior a soma dos produtos.
 * @property {string} redirectURL URL para a qual o comprador será redirecionado após o final do fluxo de pagamento.
 *                                Até 255 carácteres.
 * @property {string} notificationURL URL para a qual o PagSeguro enviará os códigos de notificação relacionados ao pagamento.
 *                                    Toda vez que houver uma mudança no status da transação e que demandar sua atenção, uma
 *                                    nova notificação será enviada para este endereço.
 *                                    Até 255 carácteres.
 * @property {number} maxUses Número máximo de usos para o código de pagamento.
 *                            Determina o número máximo de vezes que o código de pagamento criado pela
 *                            chamada à API de Pagamentos poderá ser usado.
 *                            Esse parâmetro pode ser usado como um controle de segurança.
 *                            Valor de 0 até 999.
 * @property {number} maxAge Prazo de validade do código de pagamento.
 *                           Determina o prazo (em segundos) durante o qual o código de pagamento criado pela
 *                           chamada à API de Pagamentos poderá ser usado.
 *                           Esse parâmetro pode ser usado como um controle de segurança.
 *                           Valor de 30 até 999999999
 * @property {any} metadata Metadados da transação.
 *                          Permite adicionar informações extras, agrupadas ou não, em sua requisição de pagamento.
 *                          Não implementado.
 * @property {Date} sentDate Data de envio ao PagSeguro.
 * @description Compra.
 */
export var Checkout:mongoose.Model<ICheckout> = mongoose.model<ICheckout>("Checkout", CheckoutSchema);

/**
 * @interface
 * @property code Código identificador do pagamento criado.
 *                32 carácteres.
 * @property {Date} date Data de criação do pagamento.
 *                       Formato YYYY-MM-DDThh:mm:ss.sTZD, o formato oficial do W3C para datas.
 * @description Resposta de sucesso para requisição de compra.
 */
export interface ICheckoutResponse {
    code: string;
    date: Date;
};

/**
 * @interface
 * @property {number} code Código de erro.
 * @property {string} message Mensagem de erro.
 * @description Erro retornado na requisição da operação de compra
 */
export interface ICheckoutError {
    code: number;
    message: string;
};

/**
 * @interface
 * @property {Array<ICheckoutError>} errors Lista de erros.
 * @description Reposta de erro na requisição de checkout.
 */
export interface ICheckoutResponseError {
    errors: Array<ICheckoutError>;
};
