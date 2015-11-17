"use strict";
var UserController = (function () {
    function UserController(resource, parameters, location) {
        this.resource = resource;
        this.parameters = parameters;
        this.location = location;
        var self = this;
        if (parameters["id"]) {
            resource.findById(parameters["id"])
                .then(function (user) { return self.user = user; })
                .catch(function (error) { return console.log(error); });
        }
        else {
            this.user = new UserModel();
        }
    }
    UserController.prototype.save = function () {
        var self = this;
        this.resource.save(this.user)
            .then(function (user) {
            self.location.path("/users");
        })
            .catch(function (error) { return console.log(error); });
    };
    UserController.prototype.delete = function () {
        var self = this;
        this.resource.delete(this.user._id)
            .then(function () { return self.location.path("/users"); })
            .catch(function (error) { return console.log(error); });
    };
    return UserController;
})();
angular.module("n4_payment")
    .controller("UserController", [
    "UserResource",
    "$routeParams",
    "$location",
    UserController
]);
