"use strict";

import {IAddress} from "../models/address_model";
import {IShipping} from "../models/shipping_model";
import {Shipping} from "../models/shipping_model";
import {EnumShipping} from "../models/shipping_model";
import {IPaymentBuilder} from "./pagseguro_builder";
import {IAddressBuilder} from "./address_builder";
import {AddressBuilder} from "./address_builder";

export interface IShippingBuilder {
    ofType(type:EnumShipping):IShippingBuilder;
    withAddress(address?: IAddress):IAddressBuilder;
    andCost(cost:number):IShippingBuilder;
    build():IShipping;
    buildAndReturn():IPaymentBuilder;
    return():IPaymentBuilder;
}

export class ShippingBuilder implements IShippingBuilder {
    private shipping: IShipping;
    constructor(private builder: IPaymentBuilder) {
        this.shipping = new Shipping();
    }

    ofType(type:EnumShipping):IShippingBuilder {
        this.shipping.type = type;
        return this;
    }

    withAddress(address?: IAddress):IAddressBuilder {
        if (address) {
            this.shipping.address = address;
        }
        return new AddressBuilder(this);
    }

    andCost(cost: number):IShippingBuilder {
        this.shipping.cost = cost;
        return this;
    }

    build(): IShipping {
        return this.shipping;
    }

    buildAndReturn():IPaymentBuilder {
        this.builder.withShipping(this.shipping);
        return this.builder;
    }

    return():IPaymentBuilder {
        return this.builder;
    }
}
