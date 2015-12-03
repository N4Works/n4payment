"use strict";

class LoginController {
    loginData: LoginModel;
    logado: boolean;
    constructor(
        private BASE_URL: string,
        private $window: ng.IWindowService,
        private loginResource: LoginResource,
        private notificationsService: n4Notifications.N4NotificationsService,
        private md5: any) {
        this.logado = false;
        this.loginData = new LoginModel();
        var self = this;
        loginResource.getUser()
            .then(user => $window.location.href = BASE_URL);
    }

    login() {
        var self = this;
        var login = angular.copy(this.loginData);
        login.password = this.md5.createHash(login.password);
        this.loginResource.login(login)
            .then((message: string) => {
                self.notificationsService.notifySuccess(message, "Ok");
            })
            .catch(e => self.notificationsService.notifyAlert(e.message, "Ok"));
    }
}

angular.module("n4_payment")
    .controller("LoginController", [
        "BASE_URL",
        "$window",
        "LoginResource",
        "n4NotificationsService",
        "md5",
        LoginController
]);
