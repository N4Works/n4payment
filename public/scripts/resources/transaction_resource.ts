"use strict";

interface ITransactionResource extends ng.resource.IResourceClass<any> {
    update(data:{id:string}, transaction:TransactionModel):{$promise:ng.IPromise<TransactionModel>};
};

class TransactionResource {
    provider: ITransactionResource;
    constructor($resource: ng.resource.IResourceService) {
        this.provider = <ITransactionResource>$resource("/api/pagseguro/transactions/", {}, {
        });
    }

    findAll() {
        return this.provider.query()
            .$promise
            .then((transactions:Array<any>) => transactions.map((t:any) => new TransactionModel(t)));
    }
}

angular.module("n4_payment")
    .factory("TransactionResource", [
        "$resource",
        ($resource: ng.resource.IResourceService) => new TransactionResource($resource)
    ]);
