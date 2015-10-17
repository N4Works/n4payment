"use strict";

interface IUserResource extends ng.resource.IResourceClass<any> {
    update(data:{id:string}, user:UserModel):{$promise:ng.IPromise<UserModel>};
};

class UserResource {
    provider: IUserResource;
    constructor($resource: ng.resource.IResourceService) {
        this.provider = <IUserResource>$resource("/api/users/:id", {id: "@id"}, {
            update: {
                method: "PUT",
                isArray: false
            }
        });
    }

    save(user: UserModel) {
        if (!!user._id) {
            return this.provider.update({id:user._id}, user)
                .$promise
                .then((userData:any) => new UserModel(userData));
        }
        return this.provider.save(user)
            .$promise
            .then((userData:any) => new UserModel(userData));
    }

    findAll() {
        return this.provider.query()
            .$promise
            .then((users:Array<any>) => users.map((u:any) => new UserModel(u)));
    }

    findById(id: string) {
        return this.provider.get({ id: id })
            .$promise
            .then((userData:any) => new UserModel(userData));
    }

    delete(id: string) {
        return this.provider.delete({ id: id })
            .$promise
            .then((userData:any) => new UserModel(userData));
    }
}

angular.module("n4_payment")
    .factory("UserResource", [
        "$resource",
        ($resource: ng.resource.IResourceService) => new UserResource($resource)
    ]);
