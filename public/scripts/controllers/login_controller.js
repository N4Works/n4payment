"use strict";
var LoginController = (function () {
    function LoginController(loginResource, notificationsService, menuService) {
        this.loginResource = loginResource;
        this.notificationsService = notificationsService;
        this.menuService = menuService;
        this.logado = false;
        this.loginData = new LoginModel();
        var self = this;
        loginResource.getUser()
            .then(function (user) { return self.loginData.user = user; })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    }
    LoginController.prototype.login = function () {
        var self = this;
        this.loginResource.login(this.loginData)
            .then(function (user) {
            self.notificationsService.notifySuccess("Login realizado.", "Ok");
            self.loginData.user = user;
        })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    };
    LoginController.prototype.logout = function () {
        var _this = this;
        var self = this;
        this.loginResource.logout()
            .then(function () { return _this.loginData.clear(); })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    };
    return LoginController;
})();
angular.module("n4_payment")
    .controller("LoginController", [
    "LoginResource",
    "n4NotificationsService",
    "MenuService",
    LoginController
]);
