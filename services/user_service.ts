"use strict";

import {IUser, User} from "../models/user_model";

/**
 * @interface
 * @description Serviço de usuário.
 */
export interface IUserService {
    /**
     * @method
     * @param {any} filter
     * @return {Promise<Array<IUser>>} Promessa de um lista de usuários.
     * @description Busca usuários através de um filtro.
     */
    find(filtro: any): Promise<Array<IUser>>;
    /**
     * @method
     * @param {string} id
     * @return {Promise<ISender>} Promessa de um usuário.
     * @description Busca um usuário através do identificador.
     */
    findById(id: string): Promise<IUser>;
    /**
     * @method
     * @param {any} userData
     * @return {Promise<IUser>} Promessa de um usuário após persistido.
     * @description Persiste um usuário no banco de dados.
     */
    insert(userData: any): Promise<IUser>;
    /**
     * @method
     * @param {string} id Identificador da comprador.
     * @param {any} userData Objeto contendo os campos que devem ser alterados.
     * @return {Promise<IUser>} Promessa de um usuário após persistido.
     * @description Persiste um usuário no banco de dados.
     */
    update(id: string, userData: any): Promise<IUser>;
    /**
     * @method
     * @param {string} id Identificador da usuário.
     * @return {Promise<ISender>} Promessa do usuário deletado.
     * @description Deleta um usuário do banco de dados.
     */
    delete(id: string): Promise<IUser>;
}

/**
 * @class
 * @description Serviço de usuário.
 */
export class UserService implements IUserService {
    /**
     * @method
     * @param {any} filter
     * @return {Promise<Array<IUser>>} Promessa de um lista de usuários.
     * @description Busca usuários através de um filtro.
     */
    find(filtro: any): Promise<Array<IUser>> {
        var self = this;
        return new Promise<Array<IUser>>((resolve: Function, reject: Function) =>
            User.find(filtro, (error: any, users: Array<IUser>) =>
                (!!error) ? reject(error) : resolve(users)));
    }

    /**
     * @method
     * @param {string} id
     * @return {Promise<ISender>} Promessa de um usuário.
     * @description Busca um usuário através do identificador.
     */
    findById(id: string): Promise<IUser> {
        var self = this;
        return new Promise<IUser>((resolve: Function, reject: Function) =>
            User.findById(id, (error: any, user:IUser) =>
                (!!error) ? reject(error) : resolve(user)));
    }

    /**
     * @method
     * @param {any} userData
     * @return {Promise<IUser>} Promessa de um usuário após persistido.
     * @description Persiste um usuário no banco de dados.
     */
    insert(userData: any): Promise<IUser> {
        var self = this;
        return new Promise<IUser>((resolve: Function, reject: Function) => {
            var user:IUser = new User(userData);
            user.save(error => !!error ? reject(error) : resolve(user));
        });
    }

    /**
     * @method
     * @param {string} id Identificador da comprador.
     * @param {any} userData Objeto contendo os campos que devem ser alterados.
     * @return {Promise<IUser>} Promessa de um usuário após persistido.
     * @description Persiste um usuário no banco de dados.
     */
    update(id: string, userData: any): Promise<IUser> {
        var self = this;
        return new Promise<IUser>((resolve: Function, reject: Function) => {
            userData = new User(userData);
            userData._id = id;
            User.findByIdAndUpdate(id, userData, (error:any, user:IUser) => !!error ? reject(error) : resolve(user));
        });
    }

    /**
     * @method
     * @param {string} id Identificador da usuário.
     * @return {Promise<ISender>} Promessa do usuário deletado.
     * @description Deleta um usuário do banco de dados.
     */
    delete(id: string): Promise<IUser> {
        var self = this;
        return new Promise<IUser>((resolve: Function, reject: Function) =>
            User.findByIdAndRemove(id, (error: any, user: IUser) => !!error ? reject(error) : resolve(user)));
    }
}
