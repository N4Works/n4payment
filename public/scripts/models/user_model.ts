"use strict";

class UserModel {
    _id: string;
    email: string;
    password: string;
    token: string;
    redirectURL: string;
    notificationURL: string;
    constructor(userData?:any) {
        angular.extend(this, userData);
    }
}

angular.module("n4_payment")
    .factory("UserModel", () => UserModel);
