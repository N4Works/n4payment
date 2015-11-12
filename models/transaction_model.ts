"use strict";

import mongoose = require("mongoose");
import {IPaymentMethod, PaymentMethodSchema} from "./paymentmethod_model";
import {ICreditorFees, CreditorFeesSchema} from "./creditorfees_model";
import {IItem, Item, ItemSchema} from "./item_model";
import {ShippingSchema, IShipping} from "./shipping_model";
import {ISender, SenderSchema} from "./sender_model";

/**
 * @enum
 * @description Enumerador para o tipo de transação.
 */
export enum EnumTransactionType {
    payment = 1,
    subscription = 11
}

export enum EnumTransactionStatus {
    /**
     * @description O comprador iniciou a transação, mas até o momento o PagSeguro não recebeu
     *              nenhuma informação sobre o pagamento.
     */
    aguardando_pagamento = 1,
    /**
     * @description O comprador optou por pagar com um cartão de crédito e o PagSeguro está analisando
     *              o risco da transação.
     */
    em_analise = 2,
    /**
     * @description a transação foi paga pelo comprador e o PagSeguro já recebeu uma confirmação
     *              da instituição financeira responsável pelo processamento.
     */
    paga = 3,
    /**
     * @description A transação foi paga e chegou ao final de seu prazo de liberação sem ter sido
     *              retornada e sem que haja nenhuma disputa aberta.
     */
    disponivel = 4,
    /**
     * @description O comprador, dentro do prazo de liberação da transação, abriu uma disputa.
     */
    em_disputa = 5,
    /**
     * @description O valor da transação foi devolvido para o comprador.
     */
    devolvida = 6,
    /**
     * @description A transação foi cancelada sem ter sido finalizada.
     */
    cancelada = 7,
    /**
     * @description O valor da transação foi devolvido para o comprador.
     */
    chargeback_debitado = 8,
    /**
     * @description O comprador abriu uma solicitação de chargeback junto à operadora do cartão de crédito.
     */
    em_contestacao = 9
};

/**
 * @enum
 * @description Enumerador que indica se o pagamento foi cancelado pelo PagSeguro (INTERNAL) ou
 *              pela instituição financeira (EXTERNAL).
 */
export class EnumTransactionCancellationSource {
    static internal:string  = "INTERNAL";
    static external:string = "EXTERNAL";
}

/**
 * @interface
 * @property {Date} date Data de criação da transação.
 *                       Formato: YYYY-MM-DDThh:mm:ss.sTZD, o formato oficial do W3C para datas.
 * @property {string} code Código identificador da transação.
 *                         36 carácteres.
 * @property {string} reference Código utilizado como referência na compra.
 *                              200 carácteres.
 * @property {EnumTransactionType} type Tipo da transação.
 * @property {EnumTransactionStatus} status Status da transação.
 * @property {EnumTransactionCancellationSource} cancellationSource Informa a origem do cancelamento da transação:
 *                                                                  pelas instituições financeiras (Banco Emissor ou
 *                                                                  Operadora do Cartão) ou pelo PagSeguro.
 * @property {Date} lastEventDate Data da última modificação de status na transação.
 *                                Formato: YYYY-MM-DDThh:mm:ss.sTZD, o formato oficial do W3C para datas.
 * @property {IPaymentMethod} paymentMethod Dados do meio de pagamento utilizado pelo comprador.
 * @property {number} grossAmount Valor bruto da transação, calculado pela soma dos preços de todos os itens
 *                                presentes no pagamento.
 * @property {number} discountAmount Valor do desconto dado a compradores que optaram por pagar com débito online
 *                                   ou boleto. Este desconto aplica-se quando você opta por incluir no preço dos produtos
 *                                   o custo do parcelamento de pagamentos com cartão de crédito. O desconto é dado para não
 *                                   onerar os compradores que optaram por meios à vista.
 *                                   Formato: Decimal, com duas casas decimais separadas por ponto ("."). Por exemplo, 1234.56.
 * @property {number} netAmount Valor líquido da transação, que corresponde ao valor bruto, menos o valor das taxas.
 *                              Caso presente, o valor de extraAmount (que pode ser positivo ou negativo) também é considerado
 *                              no cálculo.
 *                              Formato: Decimal, com duas casas decimais separadas por ponto ("."). Por exemplo, 1234.56.
 * @property {Date} escrowEndDate Data em que o valor da transação estará disponível na conta do vendedor.
                                  Formato: YYYY-MM-DDThh:mm:ss.sTZD, o formato oficial do W3C para datas.
 * @property {number} extraAmount Valor extra que foi somado ou subtraído do valor pago pelo comprador.
 *                                Este valor é especificado por você no pagamento e pode representar um valor que você quer
 *                                cobrar separadamente do comprador ou um desconto que quer dar a ele.
 *                                Formato: Decimal, com duas casas decimais separadas por ponto ("."). Por exemplo, 1234.56.
 * @property {number} installmentCount Número de parcelas que o comprador escolheu no pagamento com cartão de crédito.
 * @property {ICreditorFees} creditorFees Custos cobrados pelo intermediador da transação.
 * @property {number} itemCount Quantidade de itens da transação.
 * @property {Array<IItem>} items Lista de itens.
 * @property {ISender} sender Dados do comprador da transação.
 * @property {IShipping} shipping Dados do frete.
 * @description A transação do PagSeguro.
 */
export interface ITransaction extends mongoose.Document {
    date: Date;
    code: string;
    reference: string;
    type: EnumTransactionType;
    status: EnumTransactionStatus;
    cancellationSource: EnumTransactionCancellationSource;
    lastEventDate: Date;
    paymentMethod: IPaymentMethod;
    grossAmount: number;
    discountAmount: number;
    netAmount: number;
    escrowEndDate: Date;
    extraAmount: number;
    installmentCount: number;
    creditorFees: ICreditorFees;
    itemCount: number;
    items: Array<IItem>;
    sender: ISender;
    shipping: IShipping;
};

/**
 * @description Definição referente ao Mongoose para transação.
 */
export type MTransaction = mongoose.Model<ITransaction>;

/**
 * @description Definição do esquema para o Mongoose.
 */
export var TransactionSchema: mongoose.Schema = new mongoose.Schema({
    date: { type: "Date" },
    code: { type: "string" },
    reference: { type: "string", maxLength: [200, "O código para referência interna deve ter até 200 carácteres."] },
    type: { type: "number", enum: [1, 11] },
    status: { type: "number", enum: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    cancellationSource: { type: "string", enum: ["INTERNAL", "EXTERNAL"] },
    lastEventDate: { type: "Date" },
    paymentMethod: PaymentMethodSchema,
    grossAmount: { type: "number" },
    discountAmount: { type: "number" },
    netAmount: { type: "number" },
    escrowEndDate: { type: "Date" },
    extraAmount: { type:"number" },
    installmentCount: { type:"number" },
    creditorFees: CreditorFeesSchema,
    itemCount: { type: "number" },
    items: [
        ItemSchema
    ],
    sender: SenderSchema
    //shipping: ShippingSchema,
});

/**
 * @class
 * @property {Date} date Data de criação da transação.
 *                       Formato: YYYY-MM-DDThh:mm:ss.sTZD, o formato oficial do W3C para datas.
 * @property {string} code Código identificador da transação.
 *                         36 carácteres.
 * @property {string} reference Código utilizado como referência na compra.
 *                              200 carácteres.
 * @property {EnumTransactionType} type Tipo da transação.
 * @property {EnumTransactionStatus} status Status da transação.
 * @property {EnumTransactionCancellationSource} cancellationSource Informa a origem do cancelamento da transação:
 *                                                                  pelas instituições financeiras (Banco Emissor ou
 *                                                                  Operadora do Cartão) ou pelo PagSeguro.
 * @property {Date} lastEventDate Data da última modificação de status na transação.
 *                                Formato: YYYY-MM-DDThh:mm:ss.sTZD, o formato oficial do W3C para datas.
 * @property {IPaymentMethod} paymentMethod Dados do meio de pagamento utilizado pelo comprador.
 * @property {number} grossAmount Valor bruto da transação, calculado pela soma dos preços de todos os itens
 *                                presentes no pagamento.
 * @property {number} discountAmount Valor do desconto dado a compradores que optaram por pagar com débito online
 *                                   ou boleto. Este desconto aplica-se quando você opta por incluir no preço dos produtos
 *                                   o custo do parcelamento de pagamentos com cartão de crédito. O desconto é dado para não
 *                                   onerar os compradores que optaram por meios à vista.
 *                                   Formato: Decimal, com duas casas decimais separadas por ponto ("."). Por exemplo, 1234.56.
 * @property {number} netAmount Valor líquido da transação, que corresponde ao valor bruto, menos o valor das taxas.
 *                              Caso presente, o valor de extraAmount (que pode ser positivo ou negativo) também é considerado
 *                              no cálculo.
 *                              Formato: Decimal, com duas casas decimais separadas por ponto ("."). Por exemplo, 1234.56.
 * @property {Date} escrowEndDate Data em que o valor da transação estará disponível na conta do vendedor.
                                  Formato: YYYY-MM-DDThh:mm:ss.sTZD, o formato oficial do W3C para datas.
 * @property {number} extraAmount Valor extra que foi somado ou subtraído do valor pago pelo comprador.
 *                                Este valor é especificado por você no pagamento e pode representar um valor que você quer
 *                                cobrar separadamente do comprador ou um desconto que quer dar a ele.
 *                                Formato: Decimal, com duas casas decimais separadas por ponto ("."). Por exemplo, 1234.56.
 * @property {number} installmentCount Número de parcelas que o comprador escolheu no pagamento com cartão de crédito.
 * @property {ICreditorFees} creditorFees Custos cobrados pelo intermediador da transação.
 * @property {number} itemCount Quantidade de itens da transação.
 * @property {Array<IItem>} items Lista de itens.
 * @property {ISender} sender Dados do comprador da transação.
 * @property {IShipping} shipping Dados do frete.
 * @description A transação do PagSeguro.
 */
export var Transaction:MTransaction = mongoose.model<ITransaction>("Transaction",
    TransactionSchema);
