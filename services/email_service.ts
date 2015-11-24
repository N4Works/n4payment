"use strict";

import {IEmail} from "../models/email_model";
import consts = require("../constants");
import nodemailer = require("nodemailer");

export interface IEmailService {
    send(email:IEmail):Promise<void>;
}

export class EmailService {
    send(email:IEmail):Promise<void> {
        return new Promise<void>((resolve:Function, reject:Function) => {
            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: consts.EMAIL_USER,
                    pass: consts.EMAIL_PASSWORD
                }
            });

            transporter.sendMail({
                to: email.email,
                subject: email.subject,
                text: email.message
            }, (error: any, response: any) => {
                if (error) {
                    return reject(`Ocorreu o seguinte problema ao enviar e-mail para ${email.email}: ${error}.`);
                }
                return resolve();
            });
        });
    }
}
