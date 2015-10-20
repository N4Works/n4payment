"use strict";

interface ISenderResource extends ng.resource.IResourceClass<any> {
    update(data:{id:string}, sender:SenderModel):{$promise:ng.IPromise<SenderModel>};
};

class SenderResource {
    provider: ISenderResource;
    constructor($resource: ng.resource.IResourceService) {
        this.provider = <ISenderResource>$resource("/api/senders/:id", {id: "@id"}, {
            update: {
                method: "PUT",
                isArray: false
            }
        });
    }

    save(sender: SenderModel) {
        if (!!sender._id) {
            return this.provider.update({id:sender._id}, sender)
                .$promise
                .then((senderData:any) => new SenderModel(senderData));
        }
        return this.provider.save(sender)
            .$promise
            .then((senderData:any) => new SenderModel(senderData));
    }

    findAll() {
        return this.provider.query()
            .$promise
            .then((senders:Array<any>) => senders.map((u:any) => new SenderModel(u)));
    }

    findById(id: string) {
        return this.provider.get({ id: id })
            .$promise
            .then((senderData:any) => new SenderModel(senderData));
    }

    delete(id: string) {
        return this.provider.delete({ id: id })
            .$promise
            .then((senderData:any) => new SenderModel(senderData));
    }
}

angular.module("n4_payment")
    .factory("SenderResource", [
        "$resource",
        ($resource: ng.resource.IResourceService) => new SenderResource($resource)
    ]);
