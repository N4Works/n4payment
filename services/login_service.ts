"use strict";

import fs = require("fs");
import os = require("os");
import {IUser, User} from "../models/user_model";
import {ILogin} from "../models/login_model";
import {IUserService, UserService} from "./user_service";

export interface ILoginService {
    getUserByToken(token:string):Promise<IUser>;
    login(login:ILogin):Promise<ILogin>;
    logout(token:string):Promise<void>;
};

export class LoginService implements ILoginService {
    getUserByToken(token:string):Promise<IUser> {
        return new Promise<IUser>((resolve: Function, reject: Function) => {
            if (!token) {
                return reject("Token inválido.");
            }

            fs.readFile(`${os.tmpdir()}/${token}`, function(error, data) {
                if (!!error) {
                    return reject(error);
                }

                resolve(new User(JSON.parse(data.toString())));
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
                //todo: Criar token
                login.user = users[0];
                login.token = "token";
                fs.writeFile(`${os.tmpdir() }/${login.token}`, JSON.stringify(login.user), function(error) {
                    if (!!error) {
                        return reject(error);
                    }
                    resolve(login);
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
