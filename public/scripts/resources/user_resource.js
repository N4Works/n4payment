"use strict";
;
var UserResource = (function () {
    function UserResource($resource) {
        this.provider = $resource("/api/users/:id", { id: "@id" }, {
            update: {
                method: "PUT",
                isArray: false
            }
        });
    }
    UserResource.prototype.save = function (user) {
        if (!!user._id) {
            return this.provider.update({ id: user._id }, user)
                .$promise
                .then(function (userData) { return new UserModel(userData); });
        }
        return this.provider.save(user)
            .$promise
            .then(function (userData) { return new UserModel(userData); });
    };
    UserResource.prototype.findAll = function () {
        return this.provider.query()
            .$promise
            .then(function (users) { return users.map(function (u) { return new UserModel(u); }); });
    };
    UserResource.prototype.findById = function (id) {
        return this.provider.get({ id: id })
            .$promise
            .then(function (userData) { return new UserModel(userData); });
    };
    UserResource.prototype.delete = function (id) {
        return this.provider.delete({ id: id })
            .$promise
            .then(function (userData) { return new UserModel(userData); });
    };
    return UserResource;
})();
angular.module("n4_payment")
    .factory("UserResource", [
    "$resource",
    function ($resource) { return new UserResource($resource); }
]);
