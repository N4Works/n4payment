"use strict";

import * as mongoose from "mongoose";

/** ============================================================================
Informações da API
================================================================================*/

export class EnumService {
    static pagseguro: string = "pagseguro";
};

/**
 * Enumerador para tipo de requisicao de pagamento no PagSeguro.
 *
 * payment: Pagamento único.
 * subscription: Assinatura.
 * sandbox: Teste.
 */
export class EnumPayment {
    static payment: string = "payment";
    static subscription: string = "subscription";
    static sandbox: string = "sandbox";
};

/**
 * Inteface para configuração da requisição ao PagSeguro através de um usuário.
 *
 * email: E-mail cadastrado no PagSeguro.
 * password: Senha local para realizar chamada ao PagSeguro.
 * token: Token configurado no PagSeguro, no menu "Minha conta", "Preferências", "Integrações".
 *        32 carácteres.
 * payment: Tipo da requisição de pagamento.
 */
export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    token: string;
    payment: string;
};

/**
 * Tipo User para mongoose.
 */
export type MUser = mongoose.Model<IUser>;

/**
 * Modelo de configuração.
 */
export var User:MUser = mongoose.model<IUser>("User",
    new mongoose.Schema({
        email: { type: "string", lowercase: true, maxLength: 60, required: true },
        password: { type: "string", required: true },
        token: { type: "string", required: true, match: /^\w{32}$/ },
        payment: { type: "string", enum: ["payment", "subscription", "sandbox"], required: true }
    }));
