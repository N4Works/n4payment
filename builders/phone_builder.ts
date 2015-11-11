"use strict";

import {IPhone, Phone} from "../models/phone_model";
import {ISenderBuilder} from "./sender_builder";

/**
 * @interface
 * @description Builder de telefone.
 */
export interface IPhoneBuilder {
    /**
     * @method
     * @param {string} areaCode Código de área.
     * @returns {IPhoneBuilder}
     * @description Preenche o código de área do telefone.
     */
    withAreaCode(areaCode: string): IPhoneBuilder;
    /**
     * @method
     * @param {string} number Número de telefone.
     * @returns {IPhoneBuilder}
     * @description Preenche o número do telefone.
     */
    withNumber(number: string): IPhoneBuilder;
    /**
     * @method
     * @returns {IPhone}
     * @description Constrói um telefone com os dados fornecidos.
     */
    build(): IPhone;
    /**
     * @method
     * @returns {ISenderBuilder}
     * @description Constrói um telefone com os dados fornecidos e retorna ao builder de comprador.
     */
    buildAndReturn(): ISenderBuilder;
    /**
     * @method
     * @returns {ISenderBuilder}
     * @description Retorna ao builder de comprador.
     */
    return(): ISenderBuilder;
}

/**
 * @class
 * @description Builder de telefone.
 */
export class PhoneBuilder implements IPhoneBuilder {
    private phone: IPhone;

    /**
     * @constructor
     * @param {ISenderBuilder} builder de comprador.
     */
    constructor(private builder: ISenderBuilder) {
        this.phone = new Phone();
    }

    /**
     * @method
     * @param {string} areaCode Código de área.
     * @returns {IPhoneBuilder}
     * @description Preenche o código de área do telefone.
     */
    withAreaCode(areaCode: string): IPhoneBuilder {
        this.phone.areaCode = areaCode;
        return this;
    }

    /**
     * @method
     * @param {string} number Número de telefone.
     * @returns {IPhoneBuilder}
     * @description Preenche o número do telefone.
     */
    withNumber(number: string): IPhoneBuilder {
        this.phone.number = number;
        return this;
    }

    /**
     * @method
     * @returns {IPhone}
     * @description Constrói um telefone com os dados fornecidos.
     */
    build(): IPhone {
        return this.phone;
    }

    /**
     * @method
     * @returns {ISenderBuilder}
     * @description Constrói um telefone com os dados fornecidos e retorna ao builder de comprador.
     */
    buildAndReturn(): ISenderBuilder {
        this.builder.withPhone(this.phone);
        return this.builder;
    }

    /**
     * @method
     * @returns {ISenderBuilder}
     * @description Retorna ao builder de comprador.
     */
    return(): ISenderBuilder {
        return this.builder;
    }
}
