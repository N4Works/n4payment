"use strict";

class UserModel {
    _id: any;
    email: string;
    password: string;
    token: string;
    payment: string;
    constructor(userData?:any) {
        angular.extend(this, userData);
    }
}

angular.module("n4_payment")
    .factory("UserModel", () => UserModel);
