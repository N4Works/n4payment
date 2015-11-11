"use strict";
var LoginController = (function () {
    function LoginController(loginResource) {
        this.loginResource = loginResource;
        this.logado = false;
        this.loginData = new LoginModel();
        var self = this;
        loginResource.getUser()
            .then(function (user) { return self.loginData.user = user; });
    }
    LoginController.prototype.login = function () {
        var self = this;
        this.loginResource.login(this.loginData)
            .then(function (user) { return self.loginData.user = user; })
            .catch(function (e) { return console.log(e); });
    };
    LoginController.prototype.logout = function () {
        var _this = this;
        this.loginResource.logout()
            .then(function () { return _this.loginData.clear(); })
            .catch(function (e) { return console.log(e); });
    };
    return LoginController;
})();
angular.module("n4_payment")
    .controller("LoginController", [
    "LoginResource",
    LoginController
]);
