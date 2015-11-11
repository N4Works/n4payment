"use strict";

import mongoose = require("mongoose");

/**
 * @interface
 * @property {string} email E-mail cadastrado no PagSeguro.
                            60 carácteres.
 * @property {string} password Senha local para realizar chamada ao PagSeguro.
 * @property {string} token Token configurado no PagSeguro, no menu "Minha conta", "Preferências", "Integrações".
                      32 carácteres.
 * @property {string} redirectURL URL de redirecionamento utilizada pelo PagSeguro ao término do pagamento.
 * @property {string} notificationURL URL de notificação utilizada para comunicação do PagSeguro com o sistema.
 * @description Usuário da API.
 */
export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    token: string;
    redirectURL: string;
    notificationURL: string;
};

/**
 * @description Definição do tipo referente ao Mongoose para usuário.
 */
export type MUser = mongoose.Model<IUser>;

var UserSchema:mongoose.Schema = new mongoose.Schema({
    email: { type: "string", lowercase: true, maxLength: 60, required: true },
    password: { type: "string", required: true },
    token: { type: "string", required: true, match: /^\w{32}$/ },
    redirectURL: { type: "string", required: true },
    notificationURL: { type: "string", required: true }
});

/**
 * @class
 * @property {string} email E-mail cadastrado no PagSeguro.
                            60 carácteres.
 * @property {string} password Senha local para realizar chamada ao PagSeguro.
 * @property {string} token Token configurado no PagSeguro, no menu "Minha conta", "Preferências", "Integrações".
                      32 carácteres.
 * @property {string} redirectURL URL de redirecionamento utilizada pelo PagSeguro ao término do pagamento.
 * @property {string} notificationURL URL de notificação utilizada para comunicação do PagSeguro com o sistema.
 * @description Usuário da API.
 */
export var User:MUser = mongoose.model<IUser>("User", UserSchema);
