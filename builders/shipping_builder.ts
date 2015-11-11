"use strict";

import {IAddress} from "../models/address_model";
import {IShipping, Shipping, EnumShipping} from "../models/shipping_model";
import {IPaymentBuilder} from "./payment_builder";
import {IAddressBuilder, AddressBuilder} from "./address_builder";

/**
 * @interface
 * @description Builder de frete.
 */
export interface IShippingBuilder {
    /**
     * @method
     * @param {EnumShipping} type Tipo do frete.
     * @returns {IShippingBuilder}
     * @description Preenche o tipo do frete.
     */
    ofType(type: EnumShipping): IShippingBuilder;
    /**
     * @method
     * @param {IAddress} address Endereço de entrega.
     * @returns {IAddressBuilder}
     * @description Preenche o endereço de entrega.
     */
    withAddress(address?: IAddress): IAddressBuilder;
    /**
     * @method
     * @param {number} cost Custo do frete.
     * @returns {IShippingBuilder}
     * @description Preenche o custo do frete.
     */
    andCost(cost: number): IShippingBuilder;
    /**
     * @method
     * @returns {IShipping}
     * @description Constrói o frete com os dados fornecidos.
     */
    build(): IShipping;
    /**
     * @method
     * @returns {IPaymentBuilder}
     * @description Contrói o frete com os dados fornecidos e retorna ao builder de pagamento.
     */
    buildAndReturn(): IPaymentBuilder;
    /**
     * @method
     * @returns {IPaymentBuilder}
     * @description Retorna ao builder de pagamento.
     */
    return(): IPaymentBuilder;
}

/**
 * @class
 * @description Builder de frete.
 */
export class ShippingBuilder implements IShippingBuilder {
    private shipping: IShipping;

    /**
     * @constructor
     * @param {IPaymentBuilder} builder
     */
    constructor(private builder: IPaymentBuilder) {
        this.shipping = new Shipping();
    }

    /**
     * @method
     * @param {EnumShipping} type Tipo do frete.
     * @returns {IShippingBuilder}
     * @description Preenche o tipo do frete.
     */
    ofType(type: EnumShipping): IShippingBuilder {
        this.shipping.type = type;
        return this;
    }

    /**
     * @method
     * @param {IAddress} address Endereço de entrega.
     * @returns {IAddressBuilder}
     * @description Preenche o endereço de entrega.
     */
    withAddress(address?: IAddress): IAddressBuilder {
        if (address) {
            this.shipping.address = address;
        }
        return new AddressBuilder(this);
    }

    /**
     * @method
     * @param {number} cost Custo do frete.
     * @returns {IShippingBuilder}
     * @description Preenche o custo do frete.
     */
    andCost(cost: number): IShippingBuilder {
        this.shipping.cost = cost;
        return this;
    }

    /**
     * @method
     * @returns {IShipping}
     * @description Constrói o frete com os dados fornecidos.
     */
    build(): IShipping {
        return this.shipping;
    }

    /**
     * @method
     * @returns {IPaymentBuilder}
     * @description Contrói o frete com os dados fornecidos e retorna ao builder de pagamento.
     */
    buildAndReturn(): IPaymentBuilder {
        this.shipping.save();
        this.builder.withShipping(this.shipping);
        return this.builder;
    }

    /**
     * @method
     * @returns {IPaymentBuilder}
     * @description Retorna ao builder de pagamento.
     */
    return(): IPaymentBuilder {
        return this.builder;
    }
}
