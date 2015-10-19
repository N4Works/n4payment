"use strict";

import {IUser} from "../models/user_model";
import {MUser} from "../models/user_model";
import {User as TUser} from "../models/user_model";
import * as bluebird from "bluebird";

export interface IUserService {
    find(filtro: any): Promise<Array<IUser>>;
    findById(id: string): Promise<IUser>;
    insert(userData: any): Promise<IUser>;
    update(id: string, userData: any): Promise<IUser>;
    delete(id: string): Promise<IUser>;
}

export class UserService implements IUserService {
    constructor(private User: MUser = TUser) {
    };

    find(filtro: any) {
        var self = this;
        return new Promise<Array<IUser>>((resolve: Function, reject: Function) =>
            self.User.find(filtro, (error: any, users: Array<IUser>) =>
                (!!error) ? reject(error) : resolve(users)));
    }

    findById(id: string) {
        var self = this;
        return new Promise<IUser>((resolve: Function, reject: Function) =>
            self.User.findById(id, (error: any, user:IUser) =>
                (!!error) ? reject(error) : resolve(user)));
    }

    insert(userData: any) {
        var self = this;
        return new Promise<IUser>((resolve: Function, reject: Function) => {
            var user:IUser = new self.User(userData);
            user.save(error => !!error ? reject(error) : resolve(user));
        });
    }

    update(id: string, userData: any) {
        var self = this;
        return new Promise<IUser>((resolve: Function, reject: Function) => {
            self.User.findByIdAndUpdate(id, userData, (error:any, user:IUser) => !!error ? reject(error) : resolve(user));
        });
    }

    delete(id: string) {
        var self = this;
        return new Promise<IUser>((resolve: Function, reject: Function) =>
            self.User.findByIdAndRemove(id, (error: any, user: IUser) => !!error ? reject(error) : resolve(user)));
    }
}
