"use strict";
;
var LoginResource = (function () {
    function LoginResource($resource) {
        this.provider = $resource("/api/login", {}, {});
    }
    LoginResource.prototype.getUser = function () {
        return this.provider.get()
            .$promise
            .then(function (userData) { return new UserModel(userData); });
    };
    LoginResource.prototype.login = function (login) {
        return this.provider.save(login)
            .$promise
            .then(function (userData) { return new UserModel(userData); });
    };
    LoginResource.prototype.logout = function () {
        return this.provider.delete()
            .$promise;
    };
    return LoginResource;
})();
angular.module("n4_payment")
    .factory("LoginResource", [
    "$resource",
    function ($resource) { return new LoginResource($resource); }
]);
