"use strict";

interface ICheckoutResource extends ng.resource.IResourceClass<any> {
    update(data:{id:string}, checkout:CheckoutModel):{$promise:ng.IPromise<CheckoutModel>};
};

class CheckoutResource {
    provider: ICheckoutResource;
    constructor($resource: ng.resource.IResourceService) {
        this.provider = <ICheckoutResource>$resource("/api/checkouts/:id", {id: "@id"}, {
            update: {
                method: "PUT",
                isArray: false
            }
        });
    }

    save(checkout: CheckoutModel) {
        if (!!checkout._id) {
            return this.provider.update({id:checkout._id}, checkout)
                .$promise
                .then((checkoutData:any) => new CheckoutModel(checkoutData));
        }
        return this.provider.save(checkout)
            .$promise
            .then((checkoutData:any) => new CheckoutModel(checkoutData));
    }

    findAll() {
        return this.provider.query()
            .$promise
            .then((checkouts:Array<any>) => checkouts.map((checkoutData:any) => new CheckoutModel(checkoutData)));
    }

    findById(id: string) {
        return this.provider.get({ id: id })
            .$promise
            .then((checkoutData:any) => new CheckoutModel(checkoutData));
    }

    delete(id: string) {
        return this.provider.delete({ id: id })
            .$promise
            .then((checkoutData:any) => new CheckoutModel(checkoutData));
    }
}

angular.module("n4_payment")
    .factory("CheckoutResource", [
        "$resource",
        ($resource: ng.resource.IResourceService) => new CheckoutResource($resource)
    ]);
