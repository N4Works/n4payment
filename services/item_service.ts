"use strict";

import {IUser} from "../models/user_model";
import {IItem, Item} from "../models/item_model";
/**
 * @interface
 * @description Serviço para item.
 */
export interface IItemService {
    /**
     * @method
     * @param {any} filter
     * @return {Promise<Array<IItem>>} Promessa de uma lista de itens.
     * @description Busca itens através de um filtro.
     */
    find(filter: any): Promise<Array<IItem>>;
    /**
     * @method
     * @param {string} id
     * @return {Promise<IItem>} Promessa de um item.
     * @description Busca um item através do identificador.
     */
    findById(id: string): Promise<IItem>;
    /**
     * @method
     * @param {any} itemData
     * @return {Promise<IItem>} Promessa de um item após persistida.
     * @description Persiste um item no banco de dados.
     */
    insert(itemData: any): Promise<IItem>;
    /**
     * @method
     * @param {string} id Identificador da iten.
     * @param {any} itemData Objeto contendo os campos que devem ser alterados.
     * @return {Promise<IItem>} Promessa de um item após persistida.
     * @description Persiste um item no banco de dados.
     */
    update(id: string, itemData: any): Promise<IItem>;
    /**
     * @method
     * @param {string} id Identificador da item.
     * @return {Promise<IItem>} Promessa do item deletado.
     * @description Deleta um item do banco de dados.
     */
    delete(id: string): Promise<IItem>;
}

/**
 * @class
 * @description Serviço para iten.
 */
export class ItemService implements IItemService {
    /**
     * @constructor
     * @param {IUser} user Usuário logado.
     */
    constructor(private user: IUser) {
    }

    /**
     * @method
     * @param {any} filter
     * @return {Promise<Array<IItem>>} Promessa de uma lista de itens.
     * @description Busca itens através de um filtro.
     */
    find(filter: any): Promise<Array<IItem>> {
        var self = this;
        return new Promise<Array<IItem>>((resolve: Function, reject: Function) =>
            Item.find(filter)
                .exec((error: any, items: Array<IItem>) =>
                (!!error) ? reject(error) : resolve(items)));
    }

    /**
     * @method
     * @param {string} id
     * @return {Promise<IItem>} Promessa de um item.
     * @description Busca um item através do identificador.
     */
    findById(id: string): Promise<IItem> {
        var self = this;
        return new Promise<IItem>((resolve: Function, reject: Function) =>
            Item.findById(id, (error: any, item: IItem) =>
                (!!error) ? reject(error) : resolve(item)));
    }

    /**
     * @method
     * @param {any} itemData
     * @return {Promise<IItem>} Promessa de um item após persistida.
     * @description Persiste um item no banco de dados.
     */
    insert(itemData: any): Promise<IItem> {
        var self = this;
        return new Promise<IItem>((resolve: Function, reject: Function) => {
            var item: IItem = new Item(itemData);
            item.save(error => !!error ? reject(error) : resolve(item));
        });
    }

    /**
     * @method
     * @param {string} id Identificador do item.
     * @param {any} itemData Objeto contendo os campos que devem ser alterados.
     * @return {Promise<IItem>} Promessa de uma item após persistida.
     * @description Persiste um item no banco de dados.
     */
    update(id: string, itemData: any): Promise<IItem> {
        var self = this;
        return new Promise<IItem>((resolve: Function, reject: Function) => {
            itemData = new Item(itemData);
            Item.findByIdAndUpdate(id, itemData, (error: any, item: IItem) => !!error ? reject(error) : resolve(item));
        });
    }

    /**
     * @method
     * @param {string} id Identificador do item.
     * @return {Promise<IItem>} Promessa do item deletado.
     * @description Deleta um item do banco de dados.
     */
    delete(id: string): Promise<IItem> {
        var self = this;
        return new Promise<IItem>((resolve: Function, reject: Function) =>
            Item.findByIdAndRemove(id)
                .exec((error: any, item: IItem) => !!error ? reject(error) : resolve(item)));
    }
}
