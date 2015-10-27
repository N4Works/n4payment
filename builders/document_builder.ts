"use strict";

import {IDocument} from "../models/document_model";
import {Document} from "../models/document_model";
import {ISenderBuilder} from "./sender_builder";

/**
 * @interface
 * @description Builder de documento.
 */
export interface IDocumentBuilder {
    /**
     * @method
     * @param {string} type Indica o tipo do documento.
     * @returns {IDocumentBuilder}
     * @description Preenche o tipo do documento.
     */
    ofType(type:string):IDocumentBuilder;
    /**
     * @method
     * @param {string} value Valor do documento.
     * @returns {IDocumentBuilder}
     * @description Preenche o valor do documento.
     */
    andValue(value:string):IDocumentBuilder;
    /**
     * @method
     * @returns {IAddressBuilder}
     * @description Constrói um endereço com os dados fornecidos.
     */
    build():IDocument;
    /**
    * @method
    * @returns {IShippingBuilder}
    * @description Constrói um endereço com os dados fornecidos e retorna para o builder de frete.
    */
    buildAndReturn():ISenderBuilder;
    /**
    * @method
    * @returns {IShippingBuilder}
    * @description Retorna para o builder de frete.
    */
    return():ISenderBuilder;
}

/**
 * @class
 * @description Builder de documento.
 */
export class DocumentBuilder implements IDocumentBuilder {
    private document: IDocument;
    /**
     * @constructor
     * @param {ISenderBuilder} builder Builder de comprador.
     */
    constructor(private builder: ISenderBuilder) {
        this.document = new Document();
    }

    /**
     * @method
     * @param {string} type Indica o tipo do documento.
     * @returns {IDocumentBuilder}
     * @description Preenche o tipo do documento.
     */
    ofType(type: string):IDocumentBuilder {
        this.document.type = type;
        return this;
    }

    /**
     * @method
     * @param {string} value Valor do documento.
     * @returns {IDocumentBuilder}
     * @description Preenche o valor do documento.
     */
    andValue(value: string):IDocumentBuilder {
        this.document.value = value;
        return this;
    }

    /**
     * @method
     * @returns {IAddressBuilder}
     * @description Constrói um endereço com os dados fornecidos.
     */
    build(): IDocument {
        return this.document;
    }

    /**
    * @method
    * @returns {IShippingBuilder}
    * @description Constrói um endereço com os dados fornecidos e retorna para o builder de frete.
    */
    buildAndReturn():ISenderBuilder {
        this.builder.withDocument(this.document);
        return this.builder;
    }

    /**
    * @method
    * @returns {IShippingBuilder}
    * @description Retorna para o builder de frete.
    */
    return():ISenderBuilder {
        return this.builder;
    }
}
