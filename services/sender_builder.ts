"use strict";

import {ISender} from "../models/pagseguro_model";
import {Sender} from "../models/pagseguro_model";
import {IPhone} from "../models/pagseguro_model";
import {IPhoneBuilder} from "./phone_builder";
import {PhoneBuilder} from "./phone_builder";
import {IAddress} from "../models/pagseguro_model";
import {IAddressBuilder} from "./address_builder";
import {AddressBuilder} from "./address_builder";
import {IDocument} from "../models/pagseguro_model";
import {IDocumentBuilder} from "./document_builder";
import {DocumentBuilder} from "./document_builder";
import {IPaymentBuilder} from "./pagseguro_builder";

export interface IParentSenderBuilder {
    to(sender?:ISender):ISenderBuilder;
}

export interface ISenderBuilder {
    withName(name:string):ISenderBuilder;
    withEmail(email:string):ISenderBuilder;
    withPhone(phone?:IPhone):IPhoneBuilder;
    withAddress(address?:IAddress):IAddressBuilder;
    withDocument(document?:IDocument):IDocumentBuilder;
    build():ISender;
    buildAndReturn():IPaymentBuilder;
    return():IPaymentBuilder;
}

export class SenderBuilder {
    private sender: ISender;
    constructor(private builder: IPaymentBuilder) {
        this.sender = new Sender();
    }

    withName(name: string):ISenderBuilder {
        this.sender.name = name;
        return this;
    }

    withEmail(email: string):ISenderBuilder {
        this.sender.email = email;
        return this;
    }

    withPhone(phone?: IPhone):IPhoneBuilder {
        if (!!phone) {
            this.sender.phone = phone;
        }
        return new PhoneBuilder(this);
    }

    withAddress(address?: IAddress):IAddressBuilder {
        if (address) {
            this.sender.address = address;
        }
        return new AddressBuilder(this);
    }

    withDocument(document?: IDocument):IDocumentBuilder {
        if (!!document) {
            this.sender.documents.push(document);
        }
        return new DocumentBuilder(this);
    }

    build():ISender {
        return this.sender;
    }

    buildAndReturn():IPaymentBuilder {
        this.builder.to(this.sender);
        return this.builder;
    }

    return():IPaymentBuilder {
        return this.builder;
    }
}
