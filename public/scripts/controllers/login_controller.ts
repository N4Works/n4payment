"use strict";

class LoginController {
    loginData: LoginModel;
    logado: boolean;
    constructor(private loginResource: LoginResource) {
        this.logado = false;
        this.loginData = new LoginModel();
    }

    login() {
        var self = this;
        this.loginResource.login(this.loginData)
            .then((user: UserModel) => self.loginData.user = user)
            .catch(e => console.log(e));
    }

    logout() {
        this.loginResource.logout()
            .then(() => this.loginData.clear())
            .catch(e => console.log(e));
    }
}

angular.module("n4_payment")
    .controller("LoginController", [
        "LoginResource",
        LoginController
]);
