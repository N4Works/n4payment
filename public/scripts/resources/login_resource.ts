"use strict";

interface ILoginResource extends ng.resource.IResourceClass<any> {
};

class LoginResource {
    provider: ILoginResource;
    constructor($resource: ng.resource.IResourceService) {
        this.provider = <ILoginResource>$resource("/api/login", {}, {});
    }

    login(login: LoginModel) {
        return this.provider.save(login)
            .$promise
            .then((userData:any) => new UserModel(userData));
    }

    logout() {
        return this.provider.delete()
            .$promise;
    }
}

angular.module("n4_payment")
    .factory("LoginResource", [
        "$resource",
        ($resource: ng.resource.IResourceService) => new LoginResource($resource)
    ]);
