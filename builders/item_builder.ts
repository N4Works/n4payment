"use strict";

import {IItem} from "../models/item_model";
import {Item} from "../models/item_model";
import {IPaymentBuilder} from "./payment_builder";

/**
 * @interface
 * @description Builder de item.
 */
export interface IItemBuilder {
    /**
     * @method
     * @param {string} id Código do produto.
     * @returns {IItemBuilder}
     * @description Preenche o código do produto.
     */
    withId(id:string):IItemBuilder;
    /**
     * @method
     * @param {string} description Descrição do item.
     * @returns {IItemBuilder}
     * @description Preenche a descrição do item.
     */
    withDescription(description:string):IItemBuilder;
    /**
     * @method
     * @param {number} amount Valor unitário do item.
     * @returns {IItemBuilder}
     * @description Preenche o valor unitário do item.
     */
    withAmount(amount:number):IItemBuilder;
    /**
     * @method
     * @param {number} quantity Quantidade do item.
     * @returns {IItemBuilder}
     * @description Preenche a quantidade do item.
     */
    withQuantity(quantity:number):IItemBuilder;
    /**
     * @method
     * @param {number} shippingCost Custo do envio.
     * @returns {IItemBuilder}
     * @description Preenche o custo do frete.
     */
    withShippingCostOf(shippingCost:number):IItemBuilder;
    /**
     * @method
     * @param {number} weight Peso do item.
     * @returns {IItemBuilder}
     * @description Preenche o peso do item.
     */
    withWeight(weight:number):IItemBuilder;
    /**
     * @method
     * @returns {IItem}
     * @description Constrói um item com os dados fornecidos.
     */
    build():IItem;
    /**
     * @method
     * @returns {IItem}
     * @description Constrói um item com os dados fornecidos e retorna ao builder de pagamento.
     */
    buildAndReturn():IPaymentBuilder;
    /**
     * @method
     * @returns {IPaymentBuilder}
     * @description Retorna ao builder de pagamento.
     */
    return():IPaymentBuilder;
}

export class ItemBuilder implements IItemBuilder {
    private item: IItem;

    /**
     * @constructor
     * @param {IPaymentBuilder} builder Builder de pagamento.
     */
    constructor(private builder: IPaymentBuilder) {
        this.item = new Item();
    }

    /**
     * @method
     * @param {string} id Código do produto.
     * @returns {IItemBuilder}
     * @description Preenche o código do produto.
     */
    withId(id:string):IItemBuilder {
        this.item.id = id;
        return this;
    }

    /**
     * @method
     * @param {string} description Descrição do item.
     * @returns {IItemBuilder}
     * @description Preenche a descrição do item.
     */
    withDescription(description:string):IItemBuilder {
        this.item.description = description;
        return this;
    }

    /**
     * @method
     * @param {number} amount Valor unitário do item.
     * @returns {IItemBuilder}
     * @description Preenche o valor unitário do item.
     */
    withAmount(amount:number):IItemBuilder {
        this.item.amount = amount;
        return this;
    }

    /**
     * @method
     * @param {number} quantity Quantidade do item.
     * @returns {IItemBuilder}
     * @description Preenche a quantidade do item.
     */
    withQuantity(quantity:number):IItemBuilder {
        this.item.quantity = quantity;
        return this;
    }

    /**
     * @method
     * @param {number} shippingCost Custo do envio.
     * @returns {IItemBuilder}
     * @description Preenche o custo do frete.
     */
    withShippingCostOf(shippingCost:number):IItemBuilder {
        this.item.shippingCost = shippingCost;
        return this;
    }

    /**
     * @method
     * @param {number} weight Peso do item.
     * @returns {IItemBuilder}
     * @description Preenche o peso do item.
     */
    withWeight(weight:number):IItemBuilder {
        this.item.weight = weight;
        return this;
    }

    /**
     * @method
     * @returns {IItem}
     * @description Constrói um item com os dados fornecidos.
     */
    build(): IItem {
        return this.item;
    }

    /**
     * @method
     * @returns {IItem}
     * @description Constrói um item com os dados fornecidos e retorna ao builder de pagamento.
     */
    buildAndReturn():IPaymentBuilder {
        this.builder.withItem(this.item);
        return this.builder;
    }

    /**
     * @method
     * @returns {IPaymentBuilder}
     * @description Retorna ao builder de pagamento.
     */
    return():IPaymentBuilder {
        return this.builder;
    }
}
