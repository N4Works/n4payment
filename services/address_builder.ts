"use strict";

import {IAddress} from "../models/address_model";
import {Address} from "../models/address_model";
import {IShippingBuilder} from "./shipping_builder";

export interface IAddressBuilder {
    atStreet(street:string):IAddressBuilder;
    atNumber(number:string):IAddressBuilder;
    withPostalCode(postalCode: string):IAddressBuilder;
    inDistrict(district:string):IAddressBuilder;
    inCity(city:string):IAddressBuilder;
    inState(state:string):IAddressBuilder;
    inCountry(city:string):IAddressBuilder;
    withComplement(complement:string):IAddressBuilder;
    build():IAddress;
    buildAndReturn():IShippingBuilder;
    return():IShippingBuilder;
}

export class AddressBuilder implements IAddressBuilder {
    private address: IAddress;
    constructor(private builder: IShippingBuilder) {
        this.address = new Address();
    }

    atStreet(street:string):IAddressBuilder {
        this.address.street = street;
        return this;
    }

    atNumber(number:string):IAddressBuilder {
        this.address.number = number;
        return this;
    }

    withPostalCode(postalCode: string):IAddressBuilder {
        this.address.postalCode = postalCode;
        return this;
    }

    inDistrict(district:string):IAddressBuilder {
        this.address.district = district;
        return this;
    }

    inCity(city:string):IAddressBuilder {
        this.address.city = city;
        return this;
    }

    inState(state:string):IAddressBuilder {
        this.address.state = state;
        return this;
    }

    inCountry(country:string):IAddressBuilder {
        this.address.country = country;
        return this;
    }

    withComplement(complement:string):IAddressBuilder {
        this.address.complement = complement;
        return this;
    }

    build():IAddress {
        return this.address;
    }

    buildAndReturn():IShippingBuilder {
        this.builder.withAddress(this.address);
        return this.builder;
    }

    return():IShippingBuilder {
        return this.builder;
    }
}
