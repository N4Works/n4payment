"use strict";

import {IItem} from "../models/item_model";
import {Item} from "../models/item_model";
import {IPaymentBuilder} from "./pagseguro_builder";

export interface IItemBuilder {
    withId(id:string):IItemBuilder;
    withDescription(description:string):IItemBuilder;
    withAmount(amount:number):IItemBuilder;
    withQuantity(quantity:number):IItemBuilder;
    withShippingCostOf(shippingCost:number):IItemBuilder;
    withWeight(weight:number):IItemBuilder;
    build():IItem;
    buildAndReturn():IPaymentBuilder;
    return():IPaymentBuilder;
}

export class ItemBuilder implements IItemBuilder {
    private item: IItem;
    constructor(private builder: IPaymentBuilder) {
        this.item = new Item();
    }

    withId(id:string):IItemBuilder {
        this.item.id = id;
        return this;
    }

    withDescription(description:string):IItemBuilder {
        this.item.description = description;
        return this;
    }

    withAmount(amount:number):IItemBuilder {
        this.item.amount = amount;
        return this;
    }

    withQuantity(quantity:number):IItemBuilder {
        this.item.quantity = quantity;
        return this;
    }

    withShippingCostOf(shippingCost:number):IItemBuilder {
        this.item.shippingCost = shippingCost;
        return this;
    }

    withWeight(weight:number):IItemBuilder {
        this.item.weight = weight;
        return this;
    }

    build(): IItem {
        return this.item;
    }

    buildAndReturn():IPaymentBuilder {
        this.builder.withItem(this.item);
        return this.builder;
    }

    return():IPaymentBuilder {
        return this.builder;
    }
}
