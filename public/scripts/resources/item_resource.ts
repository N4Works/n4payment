"use strict";

interface IItemResource extends ng.resource.IResourceClass<any> {
    update(data:{_id:string}, item:ItemModel):{$promise:ng.IPromise<ItemModel>};
};

class ItemResource {
    provider: IItemResource;
    constructor($resource: ng.resource.IResourceService) {
        this.provider = <IItemResource>$resource("/api/items/:_id", {_id: "@_id"}, {
            update: {
                method: "PUT",
                isArray: false
            }
        });
    }

    save(item: ItemModel) {
        if (!!item._id) {
            return this.provider.update({_id:item._id}, item)
                .$promise
                .then((itemData:any) => new ItemModel(itemData));
        }
        return this.provider.save(item)
            .$promise
            .then((itemData:any) => new ItemModel(itemData));
    }

    findAll() {
        return this.provider.query()
            .$promise
            .then((items:Array<any>) => items.map((itemData:any) => new ItemModel(itemData)));
    }

    findById(id: string) {
        return this.provider.get({ id: id })
            .$promise
            .then((itemData:any) => new ItemModel(itemData));
    }

    delete(id: string) {
        return this.provider.delete({ id: id })
            .$promise
            .then((itemData:any) => new ItemModel(itemData));
    }
}

angular.module("n4_payment")
    .factory("ItemResource", [
        "$resource",
        ($resource: ng.resource.IResourceService) => new ItemResource($resource)
    ]);
