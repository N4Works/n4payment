"use strict";

class UsersController {
    user: UserModel = new UserModel();
    users: Array<UserModel> = new Array<UserModel>();
    constructor(private resource: UserResource,
        private notificationsService: n4Notifications.N4NotificationsService) {
        var self = this;
        resource.findAll()
            .then((users: Array<UserModel>) => self.users = users)
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));
    }

    delete(user: UserModel) {
        var self = this;
        this.resource.delete(user._id)
            .then(() => self.users.splice(self.users.indexOf(user), 1))
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));

    }
}

angular.module("n4_payment")
    .controller("UsersController", [
    "UserResource",
    "n4NotificationsService",
    UsersController
]);
