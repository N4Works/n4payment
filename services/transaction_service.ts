"use strict";

import {ITransaction, Transaction} from "../models/transaction_model";
import {IUser} from "../models/user_model";
import {EnumURLPagSeguro} from "../models/urlpagseguro_enum";
import request = require("request");
var xml2json = require("xml2json");

/**
 * @interface
 * @description Serviço para transação.
 */
export interface ITransactionService {
    /**
     * @method
     * @param {any} filter
     * @return {Promise<Array<ITransaction>>} Promessa de um lista de transações.
     * @description Busca transações através de um filtro.
     */
    find(filtro: any): Promise<Array<ITransaction>>;
    /**
     * @method
     * @param {string} code
     * @return {Promise<ITransaction>} Promessa de uma transação.
     * @description Busca uma transação através do código.
     */
    findByCode(code: string): Promise<ITransaction>;
    /**
     * @method
     * @param {string} code
     * @return {Promise<ITransaction>} Promessa de uma transação.
     * @description Busca uma transação através do código no servidor do PagSeguro, e
     *              grava as alterações na base de dados.
     */
    findByCodeAndSave(code: string): Promise<ITransaction>;
    /**
     * @method
     * @param {string} notificationCode
     * @return {Promise<void>} Promessa sem qualquer retorno.
     * @description Busca uma transação através do código da notificação no servidor
     *              do PagSeguro, e grava as alterações na base de dados.
     *              Esse método é utilizado pela API do PagSeguro para notificar
     *              alterações de status na transação, por esse motivo, não é retornado
     *              qualquer valor.
     */
    findByNotificationCodeAndSave(notificationCode: string): Promise<void>;
}

/**
 * @class
 * @description Serviço para transação.
 */
export class TransactionService implements ITransactionService {
    /**
     * @constructor
     * @param {IUser} user Usuário logado.
     */
    constructor(private user: IUser) {
    }

    /**
     * @method
     * @param {any} filter
     * @return {Promise<Array<ITransaction>>} Promessa de um lista de transações.
     * @description Busca transações através de um filtro.
     */
    find(filtro: any): Promise<Array<ITransaction>> {
        var self = this;
        return new Promise<Array<ITransaction>>((resolve: Function, reject: Function) =>
            Transaction.find(filtro, (error: any, transactions: Array<ITransaction>) =>
                (!!error) ? reject(error) : resolve(transactions)));
    }

    /**
     * @method
     * @param {string} code
     * @return {Promise<ITransaction>} Promessa de uma transação.
     * @description Busca uma transação através do código.
     */
    findByCode(code: string): Promise<ITransaction> {
        return new Promise<ITransaction>((resolve: Function, reject: Function) => {
            Transaction.findOne({ code: code },
                (error: any, t: ITransaction) => !!error ? reject(error) : resolve(t));
        });
    }

    /**
     * @method
     * @param {string} code
     * @return {Promise<ITransaction>} Promessa de uma transação.
     * @description Busca uma transação através do código no servidor do PagSeguro, e
     *              grava as alterações na base de dados.
     */
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
                self.saveTransaction(body, resolve, reject);
            });
        });
    }

    /**
     * @method
     * @param {string} notificationCode
     * @return {Promise<void>} Promessa sem qualquer retorno.
     * @description Busca uma transação através do código da notificação no servidor
     *              do PagSeguro, e grava as alterações na base de dados.
     *              Esse método é utilizado pela API do PagSeguro para notificar
     *              alterações de status na transação, por esse motivo, não é retornado
     *              qualquer valor.
     */
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
                self.saveTransaction(body, resolve, reject);
            });
        });
    }

    /**
     * @method
     * @param {any} data Objeto retornado pelo PagSeguro.
     * @returns {string} Mensagens de erro.
     * @description Método responsável por converter a estrutura de retorno de erros
     *              do PagSeguro em um modelo válido.
     */
    private getErrors(data: any) {
        var errors: Array<string> = new Array<string>();
        if (!!data.errors) {
            errors.push("Foram encontrados os seguintes problemas na requisição:");
            data.errors = data.errors.error instanceof Array ? data.errors.error : [data.errors.error];
            errors = errors.concat(data.errors.map(e => `  - ${e.code} -> ${e.message};`));
        }
        return errors.join("\n");
    }

    /**
     * @method
     * @param {any} body Dados retornados pelo PagSeguro.
     * @param {Function} resolve Callback para resolver a promessa.
     * @param {Function} reject Callback para notificar erro na promessa.
     * @description Método responsável por ler o retorno do PagSeguro e persistir os dados.
     */
    private saveTransaction(body: any, resolve: Function, reject: Function) {
        var self = this;
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
                    }, {
                        $set: data
                    }, (error) => error ? reject(error) : resolve());
                }
                t = new Transaction(data);
                t.save((error) => error ? reject(error) : resolve());
            }).catch(error => reject(error));
    }
}
