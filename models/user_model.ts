"use strict";

import * as mongoose from "mongoose";

/**
 * @description Recursos utilizados para controlar os vendedores, aos quais as
 * requisições ao PagSeguro serão realizadas.
 */

/**
 * @description Inteface para configuração da requisição ao PagSeguro através de um usuário.
 * @param {string} email E-mail cadastrado no PagSeguro.
 * @param {string} password Senha local para realizar chamada ao PagSeguro.
 * @param {string[32]} token Token configurado no PagSeguro, no menu "Minha conta", "Preferências", "Integrações".
 */
export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    token: string;
};

/**
 * @description Tipo User para mongoose.
 */
export type MUser = mongoose.Model<IUser>;

/**
 * @description Modelo de configuração.
 */
export var User:MUser = mongoose.model<IUser>("User",
    new mongoose.Schema({
        email: { type: "string", lowercase: true, maxLength: 60, required: true },
        password: { type: "string", required: true },
        token: { type: "string", required: true, match: /^\w{32}$/ }
    }));
