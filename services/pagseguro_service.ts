"use strict";

import {IUser} from "../models/user_model";
import {ICheckout, ICheckoutResponse} from "../models/checkout_model";
import {EnumURLPagSeguro} from "../models/urlpagseguro_enum";
import {ICheckoutService, CheckoutService} from "../services/checkout_service";
import nodemailer = require("nodemailer");
import request = require("request");
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
            var checkoutService: ICheckoutService = new CheckoutService(self.user);
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
                        checkout.sentDate = new Date();
                        checkout.save();
                        var checkoutResponse: ICheckoutResponse = data.checkout;
                        var urlPayment = process.env.NODE_ENV === "production" ? EnumURLPagSeguro.payment_production : EnumURLPagSeguro.payment_development;
                        var redirectURL = `${urlPayment}?code=${checkoutResponse.code}`;

                        var transporter = nodemailer.createTransport({
                            service: "gmail",
                            auth: {
                                user: "n4payment",
                                pass: "omtx txtk rbgh cjnu"
                            }
                        });

                        transporter.sendMail({
                            to: checkout.sender.email,
                            subject: `Pagamento para ${checkout.receiver.name || "n4payment"}`,
                            text: redirectURL
                        }, (error: any, response: any) => {
                            if (error) {
                                return reject(`Ocorreu o seguinte problema ao enviar e-mail ao cliente ${checkout.sender.name}: ${error}.`);
                            }
                            return resolve(redirectURL);
                        });
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
