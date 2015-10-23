"use strict";

import {IDocument} from "../models/document_model";
import {Document} from "../models/document_model";
import {ISenderBuilder} from "./sender_builder";

export interface IDocumentBuilder {
    ofType(type:string):IDocumentBuilder;
    andValue(value:string):IDocumentBuilder;
    build():IDocument;
    buildAndReturn():ISenderBuilder;
    return():ISenderBuilder;
}

export class DocumentBuilder implements IDocumentBuilder {
    private document: IDocument;
    constructor(private senderBuilder: ISenderBuilder) {
        this.document = new Document();
    }

    ofType(type: string):IDocumentBuilder {
        this.document.type = type;
        return this;
    }

    andValue(value: string):IDocumentBuilder {
        this.document.value = value;
        return this;
    }

    build(): IDocument {
        return this.document;
    }

    buildAndReturn():ISenderBuilder {
        this.senderBuilder.withDocument(this.document);
        return this.senderBuilder;
    }

    return():ISenderBuilder {
        return this.senderBuilder;
    }
}
