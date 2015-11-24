"use strict";

import fs = require("fs");
import os = require("os");
import crypto = require("crypto");
import randtoken = require("rand-token");
import consts = require("../constants");
import {IUser, User} from "../models/user_model";
import {ILogin} from "../models/login_model";
import {IUserService, UserService} from "./user_service";
import {IEmail, Email} from "../models/email_model";
import {IEmailService, EmailService} from "./email_service";

export interface ILoginService {
    getUserByToken(token:string, readExpiration?:boolean):Promise<IUser>;
    login(login:ILogin):Promise<ILogin>;
    logout(token:string):Promise<void>;
};

export class LoginService implements ILoginService {
    getUserByToken(token:string, readExpiration?:boolean):Promise<IUser> {
        return new Promise<IUser>((resolve: Function, reject: Function) => {
            if (!token) {
                return reject("Token inválido.");
            }

            fs.readFile(`${os.tmpdir()}/${token}`, function(error, data) {
                if (!!error) {
                    return reject(error);
                }

                var login:ILogin = JSON.parse(data.toString());
                if (readExpiration && +(new Date()) > +login.expiration) {
                    return reject("Token inválido.");
                }
                resolve(new User(login.user));
            });
        });
    }

    login(login:ILogin):Promise<ILogin> {
        var self = this;
        return new Promise<ILogin>((resolve: Function, reject: Function) => {
            var userService: IUserService = new UserService();
            return userService.find(login)
                .then((users: Array<IUser>) => {
                if (!users || !users.length) {
                    return reject("Usuário ou senha inválidos.");
                }
                login.user = users[0];
                login.token = randtoken.uid(16);
                login.expiration = new Date();
                login.expiration.setMinutes(login.expiration.getMinutes() + 15);

                var emailService:IEmailService = new EmailService();
                return emailService.send(new Email(login.email, "Acesso ao sistema", `${consts.BASE_URL}/api/login/${login.token}`))
                    .then(() => {
                        fs.writeFile(`${os.tmpdir()}/${login.token}`, JSON.stringify(login.user), function(error) {
                            if (!!error) {
                                return reject(error);
                            }
                            resolve(login);
                        });
                    });
            });
        });
    }

    logout(token:string):Promise<void> {
        return new Promise<void>((resolve: Function, reject: Function) => {
            if (!token) {
                return reject("Token inválido.");
            }
            fs.unlink(`${os.tmpdir() }/${token}`, function(error) {
                if (!!error) {
                    return reject(error);
                }
                resolve();
            });
        });
    }
};
