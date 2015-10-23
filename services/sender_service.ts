"use strict";

import {ISender} from "../models/sender_model";
import {Sender} from "../models/sender_model";

/**
 * @interface
 * @description Serviço para comprador.
 */
export interface ISenderService {
    /**
     * @method
     * @param {any} filter
     * @return {Promise<Array<ISender>>} Promessa de um lista de compradores.
     * @description Busca compradores através de um filtro.
     */
    find(filtro: any): Promise<Array<ISender>>;
    /**
     * @method
     * @param {string} id
     * @return {Promise<ISender>} Promessa de um comprador.
     * @description Busca um comprador através do identificador.
     */
    findById(id: string): Promise<ISender>;
    /**
     * @method
     * @param {string} email
     * @return {Promise<ISender>} Promessa de um comprador.
     * @description Busca um comprador através do e-mail.
     */
    findByEmail(email: string): Promise<ISender>;
    /**
     * @method
     * @param {any} senderData
     * @return {Promise<ISender>} Promessa de um comprador após persistido.
     * @description Persiste um comprador no banco de dados.
     */
    insert(senderData: any): Promise<ISender>;
    /**
     * @method
     * @param {string} id Identificador da comprador.
     * @param {any} senderData Objeto contendo os campos que devem ser alterados.
     * @return {Promise<ISender>} Promessa de um comprador após persistido.
     * @description Persiste um comprador no banco de dados.
     */
    update(id: string, senderData: any): Promise<ISender>;
    /**
     * @method
     * @param {string} id Identificador da comprador.
     * @return {Promise<ISender>} Promessa da comprador deletado.
     * @description Deleta um comprador do banco de dados.
     */
    delete(id: string): Promise<ISender>;
}

/**
 * @class
 * @description Serviço para comprador.
 */
export class SenderService implements ISenderService {
    /**
     * @method
     * @param {any} filter
     * @return {Promise<Array<ISender>>} Promessa de um lista de compradores.
     * @description Busca compradores através de um filtro.
     */
    find(filtro: any) {
        var self = this;
        return new Promise<Array<ISender>>((resolve: Function, reject: Function) =>
            Sender.find(filtro, (error: any, senders: Array<ISender>) =>
                (!!error) ? reject(error) : resolve(senders)));
    }

    /**
     * @method
     * @param {string} email
     * @return {Promise<ISender>} Promessa de um comprador.
     * @description Busca um comprador através do e-mail.
     */
    findByEmail(email: string):Promise<ISender> {
        return this.find({
            email: email
        }).then((senders: Array<ISender>) => senders.length > 0 ? senders[0] : null);
    }

    /**
     * @method
     * @param {string} id
     * @return {Promise<ISender>} Promessa de um comprador.
     * @description Busca um comprador através do identificador.
     */
    findById(id: string) {
        var self = this;
        return new Promise<ISender>((resolve: Function, reject: Function) =>
            Sender.findById(id, (error: any, sender:ISender) =>
                (!!error) ? reject(error) : resolve(sender)));
    }

    /**
     * @method
     * @param {any} senderData
     * @return {Promise<ISender>} Promessa de um comprador após persistido.
     * @description Persiste um comprador no banco de dados.
     */
    insert(senderData: any) {
        var self = this;
        return new Promise<ISender>((resolve: Function, reject: Function) => {
            var sender:ISender = new Sender(senderData);
            sender.save(error => !!error ? reject(error) : resolve(sender));
        });
    }

    /**
     * @method
     * @param {string} id Identificador da comprador.
     * @param {any} senderData Objeto contendo os campos que devem ser alterados.
     * @return {Promise<ISender>} Promessa de um comprador após persistido.
     * @description Persiste um comprador no banco de dados.
     */
    update(id: string, senderData: any) {
        var self = this;
        return new Promise<ISender>((resolve: Function, reject: Function) => {
            Sender.findByIdAndUpdate(id, senderData, (error:any, sender:ISender) => !!error ? reject(error) : resolve(sender));
        });
    }

    /**
     * @method
     * @param {string} id Identificador da comprador.
     * @return {Promise<ISender>} Promessa da comprador deletado.
     * @description Deleta um comprador do banco de dados.
     */
    delete(id: string) {
        var self = this;
        return new Promise<ISender>((resolve: Function, reject: Function) =>
            Sender.findByIdAndRemove(id, (error: any, sender: ISender) => !!error ? reject(error) : resolve(sender)));
    }
}
