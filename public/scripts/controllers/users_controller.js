"use strict";
var UsersController = (function () {
    function UsersController(resource, notificationsService, menuService) {
        this.resource = resource;
        this.notificationsService = notificationsService;
        this.menuService = menuService;
        this.user = new UserModel();
        this.users = new Array();
        menuService.setPrincipal(new MenuModel("Novo vendedor", "blue", "add", "/users/new"));
        var self = this;
        resource.findAll()
            .then(function (users) { return self.users = users; })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    }
    UsersController.prototype.delete = function (user) {
        var self = this;
        this.resource.delete(user._id)
            .then(function () { return self.users.splice(self.users.indexOf(user), 1); })
            .catch(function (error) { return self.notificationsService.notifyAlert(error, "Ok"); });
    };
    return UsersController;
})();
angular.module("n4_payment")
    .controller("UsersController", [
    "UserResource",
    "n4NotificationsService",
    "MenuService",
    UsersController
]);
