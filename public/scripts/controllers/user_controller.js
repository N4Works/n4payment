"use strict";
var UserController = (function () {
    function UserController(resource, parameters, location, notificationsService, menuService) {
        this.resource = resource;
        this.parameters = parameters;
        this.location = location;
        this.notificationsService = notificationsService;
        this.menuService = menuService;
        menuService.setPrincipal(new MenuModel("Novo usuário", "blue", "add", "/users/new"));
        var self = this;
        this.user = new UserModel();
        if (parameters["id"]) {
            resource.findById(parameters["id"])
                .then(function (user) { return self.user = user; })
                .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
        }
    }
    UserController.prototype.save = function () {
        var self = this;
        this.resource.save(this.user)
            .then(function (user) {
            self.notificationsService.notifySuccess("Cadastro realizado.", "Ok");
            self.location.path("/users");
        })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    };
    UserController.prototype.delete = function () {
        var self = this;
        this.resource.delete(this.user._id)
            .then(function () { return self.location.path("/users"); })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    };
    return UserController;
})();
angular.module("n4_payment")
    .controller("UserController", [
    "UserResource",
    "$routeParams",
    "$location",
    "n4NotificationsService",
    "MenuService",
    UserController
]);
