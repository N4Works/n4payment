"use strict";

import {ITransaction} from "../models/transaction_model";
import {Transaction} from "../models/transaction_model";
import {IUser} from "../models/user_model";
import {EnumURLPagSeguro} from "../models/urlpagseguro_enum";
import * as request from "request";
var xml2json = require("xml2json");


export interface ITransactionService {
    find(filtro: any): Promise<Array<ITransaction>>;
    findByCode(code: string): Promise<ITransaction>;
    findByCodeAndSave(code: string): Promise<ITransaction>;
    findByNotificationCodeAndSave(notificationCode: string): Promise<void>;
}

export class TransactionService implements ITransactionService {
    constructor(private user: IUser) {
    }

    find(filtro: any): Promise<Array<ITransaction>> {
        var self = this;
        return new Promise<Array<ITransaction>>((resolve: Function, reject: Function) =>
            Transaction.find(filtro, (error: any, transactions: Array<ITransaction>) =>
                (!!error) ? reject(error) : resolve(transactions)));
    }

    findByCode(code: string): Promise<ITransaction> {
        return new Promise<ITransaction>((resolve: Function, reject: Function) => {
            Transaction.findOne({ code: code },
                (error: any, t: ITransaction) => !!error ? reject(error) : resolve(t));
        });
    }

    findByCodeAndSave(code: string): Promise<ITransaction> {
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
                var data: any = xml2json.toJson(body, { object: true });
                var errors: string = this.getErrors(data);
                if (!!errors) {
                    return reject(errors);
                }
                data = data.transaction;
                data.items = data.items.item;
                self.findByCode(data.code)
                    .then((t: ITransaction) => {
                        if (!!t) {
                            return Transaction.update({
                                code: t.code
                            }, data, (error) => error ? reject(error) : resolve());
                        }
                        new Transaction(data).save((error) => error ? reject(error) : resolve());
                    })
                    .catch(error => reject(error));
            });
        });
    }

    findByNotificationCodeAndSave(notificationCode: string): Promise<void> {
        var self = this;
        return new Promise<void>((resolve: Function, reject: Function) => {
            var urlTransaction = process.env.NODE_ENV === "production" ? EnumURLPagSeguro.transaction_notification_production : EnumURLPagSeguro.transaction_notification_development;
            var requestOptions: request.Options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/xml; charset=UTF-8"
                },
                uri: `${urlTransaction}/${notificationCode}?email=${self.user.email}&token=${self.user.token}`
            };

            request(requestOptions, (error: any, response: any, body: any) => {
                if (!!error) {
                    return reject(error);
                }
                var data: any = xml2json.toJson(body, { object: true });
                var errors: string = this.getErrors(data);
                if (!!errors) {
                    return reject(errors);
                }
                data = data.transaction;
                data.items = data.items.item;
                self.findByCode(data.code)
                    .then(t => {
                    if (!!t) {
                        return Transaction.update({
                            code: t.code
                        }, data, (error) => error ? reject(error) : resolve());
                    }
                    new Transaction(data).save((error) => error ? reject(error) : resolve());
                }).catch(error => reject(error));
            });
        });
    }

    private getErrors(data: any) {
        var errors: Array<string> = new Array<string>();
        if (!!data.errors) {
            errors.push("Foram encontrados os seguintes problemas na requisição:");
            data.errors = data.errors.error instanceof Array ? data.errors.error : [data.errors.error];
            errors = errors.concat(data.errors.map(e => `  - ${e.code} -> ${e.message};`));
        }
        return errors.join("\n");
    }
}
