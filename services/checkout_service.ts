"use strict";

import {IUser} from "../models/user_model";
import {ICheckout, Checkout} from "../models/checkout_model";
import {IDocument} from "../models/document_model";
import {IItem} from "../models/item_model";
import {ISender, Sender} from "../models/sender_model";
import {ISenderService, SenderService} from "./sender_service";
import {IPagSeguroSevice, PagSeguroService} from "./pagseguro_service";
var jsontoxml = require("jsontoxml");

/**
 * @interface
 * @description Serviço para compra.
 */
export interface ICheckoutService {
    /**
     * @method
     * @param {any} filter
     * @return {Promise<Array<ICheckout>>} Promessa de uma lista de compras.
     * @description Busca compras através de um filtro.
     */
    find(filter: any): Promise<Array<ICheckout>>;
    /**
     * @method
     * @param {string} id
     * @return {Promise<ICheckout>} Promessa de uma compra.
     * @description Busca uma compra através do identificador.
     */
    findById(id: string): Promise<ICheckout>;
    /**
     * @method
     * @param {any} checkoutData
     * @return {Promise<ICheckout>} Promessa de uma compra após persistida.
     * @description Persiste uma compra no banco de dados.
     */
    insert(checkoutData: any): Promise<ICheckout>;
    /**
     * @method
     * @param {string} id Identificador da compra.
     * @param {any} checkoutData Objeto contendo os campos que devem ser alterados.
     * @return {Promise<ICheckout>} Promessa de uma compra após persistida.
     * @description Persiste uma compra no banco de dados.
     */
    update(id: string, checkoutData: any): Promise<ICheckout>;
    /**
     * @method
     * @param {string} id Identificador da compra.
     * @return {Promise<ICheckout>} Promessa da compra deletada.
     * @description Deleta uma compra do banco de dados.
     */
    delete(id: string): Promise<ICheckout>;
    /**
     * @method
     * @param {ICheckout} checkout
     * @return {Promise<string>} Promessa do XML gerado a partir da compra.
     * @description Cria um XML a partir da compra.
     */
    getXML(checkout: ICheckout): Promise<string>;
}

/**
 * @class
 * @description Serviço para compra.
 */
export class CheckoutService implements ICheckoutService {
    senderService: ISenderService;

    /**
     * @constructor
     * @param {IUser} user Usuário logado.
     */
    constructor(private user: IUser) {
        this.senderService = new SenderService();
    }

    /**
     * @method
     * @param {any} filter
     * @return {Promise<Array<ICheckout>>} Promessa de uma lista de compras.
     * @description Busca compras através de um filtro.
     */
    find(filter: any): Promise<Array<ICheckout>> {
        var self = this;
        return new Promise<Array<ICheckout>>((resolve: Function, reject: Function) =>
            Checkout.find(filter)
                .populate("receiver")
                .populate("sender")
                .exec((error: any, checkouts: Array<ICheckout>) =>
                (!!error) ? reject(error) : resolve(checkouts)));
    }

    /**
     * @method
     * @param {string} id
     * @return {Promise<ICheckout>} Promessa de uma compra.
     * @description Busca uma compra através do identificador.
     */
    findById(id: string): Promise<ICheckout> {
        var self = this;
        return new Promise<ICheckout>((resolve: Function, reject: Function) =>
            Checkout.findById(id)
                .populate("receiver")
                .populate("sender")
                .populate("items")
                .exec((error: any, checkout: ICheckout) =>
                (!!error) ? reject(error) : resolve(checkout)));
    }

    /**
     * @method
     * @param {any} checkoutData
     * @return {Promise<ICheckout>} Promessa de uma compra após persistida.
     * @description Persiste uma compra no banco de dados.
     */
    insert(checkoutData: any): Promise<ICheckout> {
        var self = this;
        return new Promise<ICheckout>((resolve: Function, reject: Function) => {
            var checkout: ICheckout = new Checkout(checkoutData);
            checkout.receiver = self.user;
            self.senderService.findByEmail(checkoutData.sender.email)
                .then((sender: ISender) => {
                checkout.sender = sender;
                checkout.save(error => !!error ? reject(error) : resolve(checkout));
            })
                .catch(e => reject(e));
        });
    }

    /**
     * @method
     * @param {string} id Identificador da compra.
     * @param {any} checkoutData Objeto contendo os campos que devem ser alterados.
     * @return {Promise<ICheckout>} Promessa de uma compra após persistida.
     * @description Persiste uma compra no banco de dados.
     */
    update(id: string, checkoutData: any): Promise<ICheckout> {
        var self = this;
        return new Promise<ICheckout>((resolve: Function, reject: Function) => {
            Checkout.findByIdAndUpdate(id, {
                $set: checkoutData
            }, (error: any, checkout: ICheckout) => !!error ? reject(error) : resolve(checkout));
        });
    }

    /**
     * @method
     * @param {string} id Identificador da compra.
     * @return {Promise<ICheckout>} Promessa da compra deletada.
     * @description Deleta uma compra do banco de dados.
     */
    delete(id: string): Promise<ICheckout> {
        var self = this;
        return new Promise<ICheckout>((resolve: Function, reject: Function) =>
            Checkout.findByIdAndRemove(id)
                .populate("receiver")
                .populate("sender")
                .populate("items")
                .exec((error: any, checkout: ICheckout) => !!error ? reject(error) : resolve(checkout)));
    }

    /**
     * @method
     * @param {ICheckout} checkout
     * @return {Promise<string>} Promessa do XML gerado a partir da compra.
     * @description Cria um XML a partir da compra.
     */
    getXML(checkout: ICheckout): Promise<string> {
        return new Promise<string>((resolve: Function, reject: Function) => {
            try {
                var options = {
                    xmlHeader: {
                        standalone: true
                    },
                    prettyPrint: true
                };
                var xml: string = jsontoxml((<any>Checkout).toPagSeguro(checkout), options);
                resolve(xml);
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
