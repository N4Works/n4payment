"use strict";

interface ILoginResource extends ng.resource.IResourceClass<any> {
};

class LoginResource {
    provider: ILoginResource;
    constructor($resource: ng.resource.IResourceService) {
        this.provider = <ILoginResource>$resource("/api/login", {}, {});
    }

    getUser() {
        return this.provider.get()
            .$promise
            .then((userData:any) => new UserModel(userData));
    }

    login(login: LoginModel) {
        return this.provider.save(login)
            .$promise
            .then((data:{message:string}) => data.message);
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
