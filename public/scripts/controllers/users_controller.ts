"use strict";

class UsersController {
    user: UserModel = new UserModel();
    users: Array<UserModel> = new Array<UserModel>();
    constructor(private resource: UserResource) {
        var self = this;
        resource.findAll()
            .then((users: Array<UserModel>) => self.users = users);
    }

    save() {
        var self = this;
        this.resource.save(this.user)
            .then((user: UserModel) => {
                if (!self.user._id) {
                    self.users.unshift(user);
                }
                self.user = new UserModel();
            })
            .catch((error: any) => console.log(error));
    }

    edit(user: UserModel) {
        this.user = user;
    }

    delete(user: UserModel) {
        var self = this;
        this.resource.delete(user._id)
            .then(() => self.users.splice(self.users.indexOf(user), 1))
            .catch((error: any) => console.log(error));

    }
}

angular.module("n4_payment")
    .controller("UsersController", [
    "UserResource",
    UsersController
]);
