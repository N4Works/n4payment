"use strict";

import {IUser} from "../models/user_model";
import {ISender} from "../models/sender_model";
import {IDocument} from "../models/document_model";
import {IItem} from "../models/item_model";
import {ICheckout, Checkout, ICheckoutResponse} from "../models/checkout_model";
import {ISenderBuilder, SenderBuilder} from "./sender_builder";
import {IItemBuilder, ItemBuilder} from "./item_builder";
import {IShipping} from "../models/shipping_model";
import {IShippingBuilder, ShippingBuilder} from "./shipping_builder";
import {ICheckoutService, CheckoutService} from "../services/checkout_service";
import {IPagSeguroSevice, PagSeguroService} from "../services/pagseguro_service";
import {EnumURLPagSeguro} from "../models/urlpagseguro_enum";
import request = require("request");
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
export class PaymentBuilder {
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
        var pagseguroService: IPagSeguroSevice = new PagSeguroService(this.user);
        return pagseguroService.sendPayment(this.checkout);
    }
}
