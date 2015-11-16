"use strict";

class UserController {
    private user: UserModel;
    constructor(private resource: UserResource,
        private parameters: ng.route.IRouteParamsService,
        private location: ng.ILocationService) {
        var self = this;
        resource.findById(parameters["id"])
            .then(user => self.user = user)
            .catch(error => console.log(error));
    }

    save() {
        var self = this;
        this.resource.save(this.user)
            .then((user: UserModel) => {
                self.location.path("/users");
            })
            .catch((error: any) => console.log(error));
    }

    delete() {
        var self = this;
        this.resource.delete(this.user._id)
            .then(() => self.location.path("/users"))
            .catch((error: any) => console.log(error));

    }
}

angular.module("n4_payment")
    .controller("UserController", [
    "UserResource",
    "$routeParams",
    "$location",
    UserController
]);
