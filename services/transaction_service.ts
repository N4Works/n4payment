"use strict";

import {ITransaction} from "../models/transaction_model";
import {Transaction} from "../models/transaction_model";
import {ISenderService} from "./sender_service";
import {SenderService} from "./sender_service";
import {IUser} from "../models/user_model";
import {ISender} from "../models/sender_model";
import {EnumURLPagSeguro} from "../models/urlpagseguro_enum";
import * as request from "request";
var xml2json = require("xml2json");


export interface ITransactionService {
    find(filtro: any): Promise<Array<ITransaction>>;
    findById(id: string): Promise<ITransaction>;
    insert(transactionData: any): Promise<ITransaction>;
    update(id: string, transactionData: any): Promise<ITransaction>;
    delete(id: string): Promise<ITransaction>;
}

export class TransactionService implements ITransactionService {
    senderService:ISenderService;
    constructor(private user:IUser) {
        this.senderService = new SenderService(this.user);
    }
    find(filtro: any) {
        var self = this;
        return new Promise<Array<ITransaction>>((resolve: Function, reject: Function) =>
            Transaction.find(filtro, (error: any, transactions: Array<ITransaction>) =>
                (!!error) ? reject(error) : resolve(transactions)));
    }

    findById(id: string) {
        var self = this;
        return new Promise<ITransaction>((resolve: Function, reject: Function) => {
            Transaction.findById(id, (error: any, transaction:ITransaction) => {
                if (!!error) {
                    return reject(error);
                }
                if (!!transaction) {
                    return resolve(transaction);
                }
                var urlTransaction = process.env.NODE_ENV === "production" ? EnumURLPagSeguro.transaction_production : EnumURLPagSeguro.transaction_development;
                var requestOptions: request.Options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/xml; charset=UTF-8"
                    },
                    uri: `${urlTransaction}/${id}?email=${self.user.email}&token=${self.user.token}`
                };

                request(requestOptions, (error: any, response: any, body: any) => {
                    if (!!error) {
                        return reject(error);
                    }
                    var transaction: ITransaction = JSON.parse(xml2json.toJson(body)).transaction;
                    self.senderService.find({
                        email: transaction.sender.email
                    })
                    .then((senders: Array<ISender>) => {
                        transaction.sender = senders[0];
                        resolve(transaction);
                    });
                });
            });
        });
    }

    insert(transactionData: any) {
        var self = this;
        return new Promise<ITransaction>((resolve: Function, reject: Function) => {
            var transaction:ITransaction = new Transaction(transactionData);
            transaction.save(error => !!error ? reject(error) : resolve(transaction));
        });
    }

    update(id: string, transactionData: any) {
        var self = this;
        return new Promise<ITransaction>((resolve: Function, reject: Function) => {
            Transaction.findByIdAndUpdate(id, transactionData, (error:any, transaction:ITransaction) => !!error ? reject(error) : resolve(transaction));
        });
    }

    delete(id: string) {
        var self = this;
        return new Promise<ITransaction>((resolve: Function, reject: Function) =>
            Transaction.findByIdAndRemove(id, (error: any, transaction: ITransaction) => !!error ? reject(error) : resolve(transaction)));
    }
}
