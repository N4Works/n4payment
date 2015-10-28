"use strict";

import {IUser} from "../models/user_model";
import {ISender} from "../models/sender_model";
import {IDocument} from "../models/document_model";
import {IItem} from "../models/item_model";
import {ICheckout} from "../models/checkout_model";
import {Checkout} from "../models/checkout_model";
import {ICheckoutResponse} from "../models/checkout_model";
import {IParentSenderBuilder} from "./sender_builder";
import {ISenderBuilder} from "./sender_builder";
import {SenderBuilder} from "./sender_builder";
import {IItemBuilder} from "./item_builder";
import {ItemBuilder} from "./item_builder";
import {IShipping} from "../models/shipping_model";
import {IShippingBuilder} from "./shipping_builder";
import {ShippingBuilder} from "./shipping_builder";
import {ICheckoutService} from "../services/checkout_service";
import {CheckoutService} from "../services/checkout_service";
import {EnumURLPagSeguro} from "../models/urlpagseguro_enum";
import * as request from "request";
var xml2json = require("xml2json");

/**
 * @enum
 * @description Enumerador com o tipo de pagamento.
 */
enum EnumPayment {
    payment,
    subscription
}

/**
 * @interface
 * @description Builder de pagamento.
 */
export interface IPaymentBuilder {
    /**
     * @method
     * @param {ISender} sender O comprador.
     * @returns {ISenderBuilder}
     * @description Preenche o comprador referente a este pagamento.
     */
    to(sender?: ISender): ISenderBuilder;
    /**
     * @method
     * @param {string} currency A moeda do pagamento.
     * @returns {IPaymentBuilder}
     * @description Preenche a moeda utilizada no pagamento.
     */
    inCurrency(currency: string): IPaymentBuilder;
    /**
     * @method
     * @param {string} reference Referência utilizada para vincular o pagamento a algum controle interno.
     * @returns {IPaymentBuilder}
     * @description Preenche a referência do pagamento.
     */
    withReference(reference: string): IPaymentBuilder;
    /**
     * @method
     * @param {IShipping} shipping Dados do frete.
     * @returns {IShippingBuilder}
     * @description Preenche os dados do frete.
     */
    withShipping(shipping?: IShipping): IShippingBuilder;
    /**
     * @method
     * @param {IItem} item Dados do item.
     * @returns {IItemBuilder}
     * @description Preenche os dados do item.
     */
    withItem(item?: IItem): IItemBuilder;
    /**
     * @method
     * @param {number} extraAmount Valor de acréscimo ou desconto.
     * @returns {IPaymentBuilder}
     * @description Preenche os valores de acréscimo e desconto.
     */
    withExtraAmount(extraAmount: number): IPaymentBuilder;
    /**
     * @method
     * @param {string} redirectURL URL de redirecionamento.
     * @returns {IPaymentBuilder}
     * @description Preenche a URL de redirecionamento.
     */
    withRedirectURL(redirectURL: string): IPaymentBuilder;
    /**
     * @method
     * @param {string} notificationURL URL de notificação.
     * @returns {IPaymentBuilder}
     * @description Preenche a URL de notificação.
     */
    withNotificationURL(notificationURL: string): IPaymentBuilder;
    /**
     * @method
     * @param {number} maxUses Máximo de uso do pagamento.
     * @returns {IPaymentBuilder}
     * @description Preenche o número máximo de uso do pagamento.
     */
    withMaxUses(maxUses: number): IPaymentBuilder;
    /**
     * @method
     * @param {number} maxAge Máximo de tempo em segundos que esse pagamento poderá ser usado.
     * @returns {IPaymentBuilder}
     * @description Preenche o limite para uso do pagamento.
     */
    withMaxAge(maxAge: number): IPaymentBuilder;
    /**
     * @method
     * @returns {string} URL de redirecionamento para pagamento.
     * @description Envia o pagamento ao PagSeguro.
     */
    send(): Promise<string>;
}

/**
 * @class
 * @description Builder de pagamento.
 */
export class PaymentBuilder implements IPaymentBuilder {
    checkout: ICheckout;

    /**
     * @constructor
     * @param {IUser} user Usuário logado.
     */
    constructor(private user: IUser) {
        this.checkout = new Checkout();
        this.checkout.receiver = user;
    }

    /**
     * @method
     * @param {ISender} sender O comprador.
     * @returns {ISenderBuilder}
     * @description Preenche o comprador referente a este pagamento.
     */
    to(sender?: ISender): ISenderBuilder {
        if (!!sender) {
            this.checkout.sender = sender;
        }
        return new SenderBuilder(this);
    }

    /**
     * @method
     * @param {string} currency A moeda do pagamento.
     * @returns {IPaymentBuilder}
     * @description Preenche a moeda utilizada no pagamento.
     */
    inCurrency(currency: string) {
        this.checkout.currency = currency;
        return this;
    }

    /**
     * @method
     * @param {string} reference Referência utilizada para vincular o pagamento a algum controle interno.
     * @returns {IPaymentBuilder}
     * @description Preenche a referência do pagamento.
     */
    withReference(reference: string): IPaymentBuilder {
        this.checkout.reference = reference;
        return this;
    }

    /**
     * @method
     * @param {IItem} item Dados do item.
     * @returns {IItemBuilder}
     * @description Preenche os dados do item.
     */
    withItem(item?: IItem): IItemBuilder {
        if (!!item) {
            this.checkout.items.push(item);
        }
        return new ItemBuilder(this);
    }

    /**
     * @method
     * @param {IShipping} shipping Dados do frete.
     * @returns {IShippingBuilder}
     * @description Preenche os dados do frete.
     */
    withShipping(shipping?: IShipping): IShippingBuilder {
        if (!!shipping) {
            this.checkout.shipping = shipping;
        }
        return new ShippingBuilder(this);
    }

    /**
     * @method
     * @param {number} extraAmount Valor de acréscimo ou desconto.
     * @returns {IPaymentBuilder}
     * @description Preenche os valores de acréscimo e desconto.
     */
    withExtraAmount(extraAmount: number): IPaymentBuilder {
        this.checkout.extraAmount = extraAmount;
        return this;
    }

    /**
     * @method
     * @param {string} redirectURL URL de redirecionamento.
     * @returns {IPaymentBuilder}
     * @description Preenche a URL de redirecionamento.
     */
    withRedirectURL(redirectURL: string): IPaymentBuilder {
        this.checkout.redirectURL = redirectURL;
        return this;
    }

    /**
     * @method
     * @param {string} notificationURL URL de notificação.
     * @returns {IPaymentBuilder}
     * @description Preenche a URL de notificação.
     */
    withNotificationURL(notificationURL: string): IPaymentBuilder {
        this.checkout.notificationURL = notificationURL;
        return this;
    }

    /**
     * @method
     * @param {number} maxUses Máximo de uso do pagamento.
     * @returns {IPaymentBuilder}
     * @description Preenche o número máximo de uso do pagamento.
     */
    withMaxUses(maxUses: number): IPaymentBuilder {
        this.checkout.maxUses = maxUses;
        return this;
    }

    /**
     * @method
     * @param {number} maxAge Máximo de tempo em segundos que esse pagamento poderá ser usado.
     * @returns {IPaymentBuilder}
     * @description Preenche o limite para uso do pagamento.
     */
    withMaxAge(maxAge: number): IPaymentBuilder {
        this.checkout.maxAge = maxAge;
        return this;
    }

    /**
     * @method
     * @returns {string} URL de redirecionamento para pagamento.
     * @description Envia o pagamento ao PagSeguro.
     */
    send(): Promise<string> {
        var self = this;
        return new Promise<string>((resolve: Function, reject: Function) => {
            var checkoutService: ICheckoutService = new CheckoutService();
            checkoutService.insert(self.checkout)
                .then((c: ICheckout) => {
                return checkoutService.getXML(c);
            })
                .then((xml: string) => {
                var urlCheckout = process.env.NODE_ENV === "production" ? EnumURLPagSeguro.checkout_production : EnumURLPagSeguro.checkout_development;
                var requestOptions: request.Options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/xml; charset=UTF-8"
                    },
                    uri: `${urlCheckout}?email=${self.checkout.receiver.email}&token=${self.checkout.receiver.token}`,
                    body: xml
                };
                request(requestOptions, (error: any, response: any, body: any) => {
                    if (!!error) {
                        return reject(error);
                    }
                    var data: any = xml2json.toJson(body, { object: true });
                    var errors: string = this.getErrors(data);
                    if (!!errors) {
                        return reject(errors);
                    }
                    var checkout: ICheckoutResponse = data.checkout;
                    var urlPayment = process.env.NODE_ENV === "production" ? EnumURLPagSeguro.payment_production : EnumURLPagSeguro.payment_development;
                    return resolve(`${urlPayment}?code=${checkout.code}`);
                });
            })
                .catch((error: any) => reject(error));
        });
    }

    /**
     * @method
     * @param {any} data Objeto retornado pelo PagSeguro.
     * @returns {string} Mensagens de erro.
     * @description Método responsável por converter a estrutura de retorno de erros
     *              do PagSeguro em um modelo válido.
     */
    private getErrors(data: any) {
        var errors: Array<string> = new Array<string>();
        if (!!data.errors) {
            errors.push("Foram encontrados os seguintes problemas na requisição:");
            data.errors = data.errors.error instanceof Array ? data.errors.error : [data.errors.error];
            errors = errors.concat(data.errors.map(e => `  - ${e.code} -> ${e.message};`));
        }
        return errors.join("\n");
    }
}
