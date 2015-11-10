"use strict";

interface IPagSeguroResource extends ng.resource.IResourceClass<any> {
};

class PagSeguroResource {
    provider: IPagSeguroResource;
    constructor($resource: ng.resource.IResourceService) {
        this.provider = <IPagSeguroResource>$resource("/api/pagseguro/:service/:id", {service: "@service", id: "@id"}, {
        });
    }

    send(checkout: CheckoutModel) {
        return this.provider.save({service: "payments", id: checkout._id})
            .$promise
            .then((data:{redirectURL:string}) => data.redirectURL);
    }
}

angular.module("n4_payment")
    .factory("PagSeguroResource", [
        "$resource",
        ($resource: ng.resource.IResourceService) => new PagSeguroResource($resource)
    ]);
