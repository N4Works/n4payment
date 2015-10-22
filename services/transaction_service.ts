"use strict";

import {ITransaction} from "../models/transaction_model";
import {Transaction} from "../models/transaction_model";
import {IUser} from "../models/user_model";
import {EnumURLPagSeguro} from "../models/urlpagseguro_enum";
import * as request from "request";
var xml2json = require("xml2json");


export interface ITransactionService {
    find(filtro: any): Promise<Array<ITransaction>>;
    findByCodeAndInsert(code: string): Promise<ITransaction>;
}

export class TransactionService implements ITransactionService {
    constructor(private user?:IUser) {
    }
    find(filtro: any) {
        var self = this;
        return new Promise<Array<ITransaction>>((resolve: Function, reject: Function) =>
            Transaction.find(filtro, (error: any, transactions: Array<ITransaction>) =>
                (!!error) ? reject(error) : resolve(transactions)));
    }

    findByCodeAndInsert(code: string) {
        var self = this;
        return new Promise<ITransaction>((resolve: Function, reject: Function) => {
            var urlTransaction = process.env.NODE_ENV === "production" ? EnumURLPagSeguro.transaction_production : EnumURLPagSeguro.transaction_development;
            var requestOptions: request.Options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/xml; charset=UTF-8"
                },
                uri: `${urlTransaction}/${code}?email=${self.user.email}&token=${self.user.token}`
            };

            request(requestOptions, (error: any, response: any, body: any) => {
                if (!!error) {
                    return reject(error);
                }
                var data: any = JSON.parse(xml2json.toJson(body)).transaction;
                data.items = data.items.item;
                var transaction: ITransaction = new Transaction(data);
                transaction.save((error) => error ? reject(error) : resolve(transaction));
            });
        });
    }
}
