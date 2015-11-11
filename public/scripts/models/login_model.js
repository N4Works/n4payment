"use strict";
var LoginModel = (function () {
    function LoginModel(loginData) {
        angular.extend(this, loginData);
    }
    LoginModel.prototype.clear = function () {
        this.email = "";
        this.password = "";
        this.user = null;
    };
    return LoginModel;
})();
angular.module("n4_payment")
    .factory("LoginModel", function () { return LoginModel; });
