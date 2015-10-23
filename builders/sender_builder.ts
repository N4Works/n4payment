"use strict";

import {ISender} from "../models/sender_model";
import {Sender} from "../models/sender_model";
import {IPhone} from "../models/phone_model";
import {IPhoneBuilder} from "./phone_builder";
import {PhoneBuilder} from "./phone_builder";
import {IDocument} from "../models/document_model";
import {IDocumentBuilder} from "./document_builder";
import {DocumentBuilder} from "./document_builder";
import {IPaymentBuilder} from "./pagseguro_builder";
import {ISenderService} from "../services/sender_service";
import {SenderService} from "../services/sender_service";

export interface IParentSenderBuilder {
    to(sender?:ISender):ISenderBuilder;
}

export interface ISenderBuilder {
    withName(name:string):ISenderBuilder;
    withEmail(email:string):ISenderBuilder;
    withPhone(phone?:IPhone):IPhoneBuilder;
    withDocument(document?:IDocument):IDocumentBuilder;
    bornIn(bornDate:Date):ISenderBuilder;
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

    withDocument(document?: IDocument):IDocumentBuilder {
        if (!!document) {
            this.sender.documents.push(document);
        }
        return new DocumentBuilder(this);
    }

    bornIn(bornDate:Date):ISenderBuilder {
        this.sender.bornDate = bornDate;
        return this;
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
