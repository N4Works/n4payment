"use strict";

class LoginModel {
    email: string;
    password: string;
    user: UserModel;
    constructor(loginData?:any) {
        angular.extend(this, loginData);
    }

    clear() {
        this.email = "";
        this.password = "";
        this.user = null;
    }
}

angular.module("n4_payment")
.factory("LoginModel", () => LoginModel);
