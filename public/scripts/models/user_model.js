"use strict";
var UserModel = (function () {
    function UserModel(userData) {
        angular.extend(this, userData);
    }
    return UserModel;
})();
angular.module("n4_payment")
    .factory("UserModel", function () { return UserModel; });
