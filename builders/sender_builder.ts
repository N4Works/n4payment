"use strict";

import {ISender} from "../models/sender_model";
import {Sender} from "../models/sender_model";
import {IPhone} from "../models/phone_model";
import {IPhoneBuilder} from "./phone_builder";
import {PhoneBuilder} from "./phone_builder";
import {IDocument} from "../models/document_model";
import {IDocumentBuilder} from "./document_builder";
import {DocumentBuilder} from "./document_builder";
import {IPaymentBuilder} from "./payment_builder";
import {ISenderService} from "../services/sender_service";
import {SenderService} from "../services/sender_service";

/**
 * @interface
 * @description Builder de comprador.
 */
export interface ISenderBuilder {
    /**
     * @method
     * @param {string} name  Nome do comprador.
     * @returns {ISenderBuilder} Builder de comprador.
     * @description Preenche o nome do comprador.
     */
    withName(name: string): ISenderBuilder;
    /**
     * @method
     * @param {string} email E-mail do comprador.
     * @returns {ISenderBuilder}
     * @description Preenche o e-mail do comprador.
     */
    withEmail(email: string): ISenderBuilder;
    /**
     * @method
     * @param {IPhone} phone Telefone do comprador.
     * @returns {IPhoneBuilder}
     * @description Preenche o telefone do comprador.
     */
    withPhone(phone?: IPhone): IPhoneBuilder;
    /**
     * @method
     * @param {IDocument} document Documento do comprador.
     * @returns {IDocumentBuilder}
     * @description Preenche o documento do comprador.
     */
    withDocument(document?: IDocument): IDocumentBuilder;
    /**
     * @method
     * @param {Date} bornDate Data de nascimento.
     * @returns {ISenderBuilder}
     * @description Preenche a data de nascimento do comprador.
     */
    bornIn(bornDate: Date): ISenderBuilder;
    /**
     * @method
     * @returns {ISender}
     * @description Constrói um comprador com os dados fornecidos.
     */
    build(): ISender;
    /**
     * @method
     * @returns {IPaymentBuilder}
     * @description Contrói um comprador com os dados fornecidos e retorna ao builder de pagamento.
     */
    buildAndReturn(): IPaymentBuilder;
    /**
     * @method
     * @return {IPaymentBuilder}
     * @description Retorna ao builder de pagamento.
     */
    return(): IPaymentBuilder;
}

/**
 * @class
 * @description Builder de comprador.
 */
export class SenderBuilder {
    private sender: ISender;

    /**
     * @constructor
     * @param {IPaymentBuilder} builder Builder de pagamento.
     */
    constructor(private builder: IPaymentBuilder) {
        this.sender = new Sender();
    }

    /**
     * @method
     * @param {string} name  Nome do comprador.
     * @returns {ISenderBuilder} Builder de comprador.
     * @description Preenche o nome do comprador.
     */
    withName(name: string): ISenderBuilder {
        this.sender.name = name;
        return this;
    }

    /**
     * @method
     * @param {string} email E-mail do comprador.
     * @returns {ISenderBuilder}
     * @description Preenche o e-mail do comprador.
     */
    withEmail(email: string): ISenderBuilder {
        this.sender.email = email;
        return this;
    }

    /**
     * @method
     * @param {IPhone} phone Telefone do comprador.
     * @returns {IPhoneBuilder}
     * @description Preenche o telefone do comprador.
     */
    withPhone(phone?: IPhone): IPhoneBuilder {
        if (!!phone) {
            this.sender.phone = phone;
        }
        return new PhoneBuilder(this);
    }

    /**
     * @method
     * @param {IDocument} document Documento do comprador.
     * @returns {IDocumentBuilder}
     * @description Preenche o documento do comprador.
     */
    withDocument(document?: IDocument): IDocumentBuilder {
        if (!!document) {
            this.sender.documents.push(document);
        }
        return new DocumentBuilder(this);
    }

    /**
     * @method
     * @param {Date} bornDate Data de nascimento.
     * @returns {ISenderBuilder}
     * @description Preenche a data de nascimento do comprador.
     */
    bornIn(bornDate: Date): ISenderBuilder {
        this.sender.bornDate = bornDate;
        return this;
    }

    /**
     * @method
     * @returns {ISender}
     * @description Constrói um comprador com os dados fornecidos.
     */
    build(): ISender {
        return this.sender;
    }

    /**
     * @method
     * @returns {IPaymentBuilder}
     * @description Contrói um comprador com os dados fornecidos e retorna ao builder de pagamento.
     */
    buildAndReturn(): IPaymentBuilder {
        this.builder.to(this.sender);
        return this.builder;
    }

    /**
     * @method
     * @return {IPaymentBuilder}
     * @description Retorna ao builder de pagamento.
     */
    return(): IPaymentBuilder {
        return this.builder;
    }
}
