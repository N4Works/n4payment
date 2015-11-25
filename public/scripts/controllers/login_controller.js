"use strict";
var LoginController = (function () {
    function LoginController($window, loginResource, notificationsService, md5) {
        this.$window = $window;
        this.loginResource = loginResource;
        this.notificationsService = notificationsService;
        this.md5 = md5;
        this.logado = false;
        this.loginData = new LoginModel();
        var self = this;
        loginResource.getUser()
            .then(function (user) { return $window.location.href = "http://localhost:3000"; });
    }
    LoginController.prototype.login = function () {
        var self = this;
        var login = angular.copy(this.loginData);
        login.password = this.md5.createHash(login.password);
        this.loginResource.login(login)
            .then(function (message) {
            self.notificationsService.notifySuccess(message, "Ok");
        })
            .catch(function (e) { return self.notificationsService.notifyAlert(e.message, "Ok"); });
    };
    return LoginController;
})();
angular.module("n4_payment")
    .controller("LoginController", [
    "$window",
    "LoginResource",
    "n4NotificationsService",
    "md5",
    LoginController
]);
