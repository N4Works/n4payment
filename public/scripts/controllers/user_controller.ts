"use strict";

class UserController {
    private user: UserModel;
    constructor(private resource: UserResource,
        private parameters: ng.route.IRouteParamsService,
        private location: ng.ILocationService,
        private notificationsService: n4Notifications.N4NotificationsService,
        private menuService: MenuService) {
        menuService.setPrincipal(new MenuModel("Novo usuário", "blue", "add", "/users/new"));

        var self = this;
        this.user = new UserModel();
        if (parameters["id"]) {
            resource.findById(parameters["id"])
                .then(user => self.user = user)
                .catch(error => self.notificationsService.notifyAlert(error, "Ok"));
        }
    }

    save() {
        var self = this;
        this.resource.save(this.user)
            .then((user: UserModel) => {
            self.notificationsService.notifySuccess("Cadastro realizado.", "Ok");
            self.location.path("/users");
        })
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));
    }

    delete() {
        var self = this;
        this.resource.delete(this.user._id)
            .then(() => self.location.path("/users"))
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));

    }
}

angular.module("n4_payment")
    .controller("UserController", [
    "UserResource",
    "$routeParams",
    "$location",
    "n4NotificationsService",
    "MenuService",
    UserController
]);
