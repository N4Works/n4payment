"use strict";

import {IAddress, Address} from "../models/address_model";
import {IShippingBuilder} from "./shipping_builder";

/**
 * @interface
 * @description Builder para endereço.
 */
export interface IAddressBuilder {
    /**
     * @method
     * @param {string} street Rua do endereço.
     * @returns {IAddressBuilder}
     * @description Preenche a rua do endereço.
     */
    atStreet(street: string): IAddressBuilder;
    /**
     * @method
     * @param {string} number Número do endereço.
     * @returns {IAddressBuilder}
     * @description Preenche o número do endereço.
     */
    atNumber(number: string): IAddressBuilder;
    /**
     * @method
     * @param {string} postalCode Código postal.
     * @returns {IAddressBuilder}
     * @description Preenche o CEP do endereço.
     */
    withPostalCode(postalCode: string): IAddressBuilder;
    /**
     * @method
     * @param {string} district Bairro do endereço.
     * @returns {IAddressBuilder}
     * @description Preenche o bairro do endereço.
     */
    inDistrict(district: string): IAddressBuilder;
    /**
     * @method
     * @param {string} city Cidade do endereço.
     * @returns {IAddressBuilder}
     * @description Preenche a cidade do endereço.
     */
    inCity(city: string): IAddressBuilder;
    /**
     * @method
     * @param {string} state Estado do endereço.
     * @returns {IAddressBuilder}
     * @description Preenche o estado do endereço.
     */
    inState(state: string): IAddressBuilder;
    /**
     * @method
     * @param {string} country País do endereço.
     * @returns {IAddressBuilder}
     * @description Preenche o país do endereço.
     */
    inCountry(country: string): IAddressBuilder;
    /**
     * @method
     * @param {string} complement Complemento do endereço.
     * @returns {IAddressBuilder}
     * @description Preenche o complemento do endereço.
     */
    withComplement(complement: string): IAddressBuilder;
    /**
     * @method
     * @returns {IAddressBuilder}
     * @description Constrói um endereço com os dados fornecidos.
     */
    build(): IAddress;
    /**
    * @method
    * @returns {IShippingBuilder}
    * @description Constrói um endereço com os dados fornecidos e retorna para o builder de frete.
    */
    buildAndReturn(): IShippingBuilder;
    /**
    * @method
    * @returns {IShippingBuilder}
    * @description Retorna para o builder de frete.
    */
    return(): IShippingBuilder;
}

/**
 * @class
 * @description Builder para endereço.
 */
export class AddressBuilder implements IAddressBuilder {
    private address: IAddress;

    /**
     * @constructor
     * @param {IShippingBuilder} builder Builder de frete.
     */
    constructor(private builder: IShippingBuilder) {
        this.address = new Address();
    }

    /**
     * @method
     * @param {string} street Rua do endereço.
     * @returns {IAddressBuilder}
     * @description Preenche a rua do endereço.
     */
    atStreet(street: string): IAddressBuilder {
        this.address.street = street;
        return this;
    }

    /**
     * @method
     * @param {string} number Número do endereço.
     * @returns {IAddressBuilder}
     * @description Preenche o número do endereço.
     */
    atNumber(number: string): IAddressBuilder {
        this.address.number = number;
        return this;
    }

    /**
     * @method
     * @param {string} postalCode Código postal.
     * @returns {IAddressBuilder}
     * @description Preenche o CEP do endereço.
     */
    withPostalCode(postalCode: string): IAddressBuilder {
        this.address.postalCode = postalCode;
        return this;
    }

    /**
     * @method
     * @param {string} district Bairro do endereço.
     * @returns {IAddressBuilder}
     * @description Preenche o bairro do endereço.
     */
    inDistrict(district: string): IAddressBuilder {
        this.address.district = district;
        return this;
    }

    /**
     * @method
     * @param {string} city Cidade do endereço.
     * @returns {IAddressBuilder}
     * @description Preenche a cidade do endereço.
     */
    inCity(city: string): IAddressBuilder {
        this.address.city = city;
        return this;
    }

    /**
     * @method
     * @param {string} state Estado do endereço.
     * @returns {IAddressBuilder}
     * @description Preenche o estado do endereço.
     */
    inState(state: string): IAddressBuilder {
        this.address.state = state;
        return this;
    }

    /**
     * @method
     * @param {string} country País do endereço.
     * @returns {IAddressBuilder}
     * @description Preenche o país do endereço.
     */
    inCountry(country: string): IAddressBuilder {
        this.address.country = country;
        return this;
    }

    /**
     * @method
     * @param {string} complement Complemento do endereço.
     * @returns {IAddressBuilder}
     * @description Preenche o complemento do endereço.
     */
    withComplement(complement: string): IAddressBuilder {
        this.address.complement = complement;
        return this;
    }

    /**
     * @method
     * @returns {IAddressBuilder}
     * @description Constrói um endereço com os dados fornecidos.
     */
    build(): IAddress {
        return this.address;
    }

    /**
    * @method
    * @returns {IShippingBuilder}
    * @description Constrói um endereço com os dados fornecidos e retorna para o builder de frete.
    */
    buildAndReturn(): IShippingBuilder {
        this.builder.withAddress(this.address);
        return this.builder;
    }

    /**
    * @method
    * @returns {IShippingBuilder}
    * @description Retorna para o builder de frete.
    */
    return(): IShippingBuilder {
        return this.builder;
    }
}
