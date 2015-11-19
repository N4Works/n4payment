"use strict";

class LoginController {
    loginData: LoginModel;
    logado: boolean;
    constructor(private loginResource: LoginResource,
        private notificationsService: n4Notifications.N4NotificationsService,
        private menuService: MenuService) {
        this.logado = false;
        this.loginData = new LoginModel();
        var self = this;
        loginResource.getUser()
            .then(user => self.loginData.user = user)
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));
    }

    login() {
        var self = this;
        this.loginResource.login(this.loginData)
            .then((user: UserModel) => {
                self.notificationsService.notifySuccess("Login realizado.", "Ok");
                self.loginData.user = user;
            })
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));
    }

    logout() {
        var self = this;
        this.loginResource.logout()
            .then(() => this.loginData.clear())
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));
    }
}

angular.module("n4_payment")
    .controller("LoginController", [
        "LoginResource",
        "n4NotificationsService",
        "MenuService",
        LoginController
]);
