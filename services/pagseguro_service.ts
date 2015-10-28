"use strict";

import {IUser} from "../models/user_model";
import {ICheckout} from "../models/checkout_model";
import {EnumURLPagSeguro} from "../models/urlpagseguro_enum";
import {ICheckoutService} from "../services/checkout_service";
import {CheckoutService} from "../services/checkout_service";
import {ICheckoutResponse} from "../models/checkout_model";
import * as request from "request";
var xml2json = require("xml2json");

export interface IPagSeguroSevice {
    sendPayment(checkout: ICheckout): Promise<string>;
    getErrors(data: any): string;
}

export class PagSeguroService {
    constructor(private user: IUser) {

    }

    sendPayment(checkout: ICheckout): Promise<string> {
        var self = this;
        return new Promise<string>((resolve: Function, reject: Function) => {
            var checkoutService: ICheckoutService = new CheckoutService();
            checkoutService.getXML(checkout)
                .then((xml: string) => {
                    var urlCheckout = process.env.NODE_ENV === "production" ? EnumURLPagSeguro.checkout_production : EnumURLPagSeguro.checkout_development;
                    var requestOptions: request.Options = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/xml; charset=UTF-8"
                        },
                        uri: `${urlCheckout}?email=${self.user.email}&token=${self.user.token}`,
                        body: xml
                    };
                    request(requestOptions, (error: any, response: any, body: any) => {
                        if (!!error) {
                            return reject(error);
                        }
                        var data: any = xml2json.toJson(body, { object: true });
                        var errors: string = PagSeguroService.getErrors(data);
                        if (!!errors) {
                            return reject(errors);
                        }
                        var checkout: ICheckoutResponse = data.checkout;
                        var urlPayment = process.env.NODE_ENV === "production" ? EnumURLPagSeguro.payment_production : EnumURLPagSeguro.payment_development;
                        return resolve(`${urlPayment}?code=${checkout.code}`);
                    });
                })
                .catch(e => reject(e));
        });
    }

    /**
     * @method
     * @param {any} data Objeto retornado pelo PagSeguro.
     * @returns {string} Mensagens de erro.
     * @description Método responsável por converter a estrutura de retorno de erros
     *              do PagSeguro em um modelo válido.
     */
    getErrors(data: any): string {
        return PagSeguroService.getErrors(data);
    }

    /**
     * @method
     * @param {any} data Objeto retornado pelo PagSeguro.
     * @returns {string} Mensagens de erro.
     * @description Método responsável por converter a estrutura de retorno de erros
     *              do PagSeguro em um modelo válido.
     */
    static getErrors(data: any) {
        var errors: Array<string> = new Array<string>();
        if (!!data.errors) {
            errors.push("Foram encontrados os seguintes problemas na requisição:");
            data.errors = data.errors.error instanceof Array ? data.errors.error : [data.errors.error];
            errors = errors.concat(data.errors.map(e => `  - ${e.code} -> ${e.message};`));
        }
        return errors.join("\n");
    }
}
