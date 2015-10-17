"use strict";
var MainController = (function () {
    function MainController(resource) {
        this.resource = resource;
        this.user = new UserModel();
        this.users = new Array();
        var self = this;
        resource.findAll()
            .then(function (users) { return self.users = users; });
    }
    MainController.prototype.save = function () {
        var self = this;
        this.resource.save(this.user)
            .then(function (user) {
            if (!self.user._id) {
                self.users.unshift(user);
            }
            self.user = new UserModel();
        })
            .catch(function (error) { return console.log(error); });
    };
    MainController.prototype.edit = function (user) {
        this.user = user;
    };
    MainController.prototype.delete = function (user) {
        var self = this;
        this.resource.delete(user._id)
            .then(function () { return self.users.splice(self.users.indexOf(user), 1); })
            .catch(function (error) { return console.log(error); });
    };
    return MainController;
})();
angular.module("n4_payment")
    .controller("MainController", [
    "UserResource",
    MainController
]);
