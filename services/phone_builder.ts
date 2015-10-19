"use strict";

import {IPhone} from "../models/phone_model";
import {Phone} from "../models/phone_model";
import {ISenderBuilder} from "./sender_builder";

export interface IPhoneBuilder {
    withAreaCode(areaCode:number):IPhoneBuilder;
    withNumber(number:string):IPhoneBuilder;
    build():IPhone;
    buildAndReturn():ISenderBuilder;
    return():ISenderBuilder;
}

export class PhoneBuilder implements IPhoneBuilder {
    private phone: IPhone;
    constructor(private senderBuilder: ISenderBuilder) {
        this.phone = new Phone();
    }

    withAreaCode(areaCode: number):IPhoneBuilder {
        this.phone.areaCode = areaCode;
        return this;
    }

    withNumber(number: string):IPhoneBuilder {
        this.phone.number = number;
        return this;
    }

    build(): IPhone {
        return this.phone;
    }

    buildAndReturn():ISenderBuilder {
        this.senderBuilder.withPhone(this.phone);
        return this.senderBuilder;
    }

    return():ISenderBuilder {
        return this.senderBuilder;
    }
}
