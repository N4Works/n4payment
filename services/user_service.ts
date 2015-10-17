"use strict";

import * as model from "../models/user_model";
import * as bluebird from "bluebird";

export interface IUserService {
    find(filtro: any): Promise<Array<model.IUser>>;
    findById(id: string): Promise<model.IUser>;
    insert(userData: any): Promise<model.IUser>;
    update(id: string, userData: any): Promise<model.IUser>;
    delete(id: string): Promise<model.IUser>;
}

export class UserService implements IUserService {
    constructor(private User: model.MUser = model.User) {
    };

    find(filtro: any) {
        var self = this;
        return new Promise<Array<model.IUser>>((resolve: Function, reject: Function) =>
            self.User.find(filtro, (error: any, users: Array<model.IUser>) =>
                (!!error) ? reject(error) : resolve(users)));
    }

    findById(id: string) {
        var self = this;
        return new Promise<model.IUser>((resolve: Function, reject: Function) =>
            self.User.findById(id, (error: any, user: model.IUser) =>
                (!!error) ? reject(error) : resolve(user)));
    }

    insert(userData: any) {
        var self = this;
        return new Promise<model.IUser>((resolve: Function, reject: Function) => {
            var user:model.IUser = new self.User(userData);
            user.save(error => !!error ? reject(error) : resolve(user));
        });
    }

    update(id: string, userData: any) {
        var self = this;
        return new Promise<model.IUser>((resolve: Function, reject: Function) => {
            self.User.findByIdAndUpdate(id, userData, (error:any, user:model.IUser) => !!error ? reject(error) : resolve(user));
        });
    }

    delete(id: string) {
        var self = this;
        return new Promise<model.IUser>((resolve: Function, reject: Function) =>
            self.User.findByIdAndRemove(id, (error: any, user: model.IUser) => !!error ? reject(error) : resolve(user)));
    }
}
