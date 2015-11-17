"use strict";

class CheckoutController {
    private checkout: CheckoutModel;
    private senders:Array<SenderModel>;
    private items:Array<ItemModel>;
    constructor(private resource: CheckoutResource,
        private parameters: ng.route.IRouteParamsService,
        private location: ng.ILocationService,
        private $window: ng.IWindowService,
        private filter: ng.IFilterFilter,
        private senderResource:SenderResource,
        private pagseguroResource:PagSeguroResource,
        private itemResource:ItemResource) {
            var self = this;
            senderResource.findAll()
                .then(senders => self.senders = senders);
            itemResource.findAll()
                .then(items => self.items = items);
            if (parameters["id"]) {
                resource.findById(parameters["id"])
                    .then(checkout => self.checkout = checkout)
                    .catch(error => console.log(error));
            } else {
                this.checkout = new CheckoutModel();
            }
    }

    selectSender(sender:SenderModel) {
        this.checkout.sender = sender;
    }

    senderIsSelected(sender: SenderModel) {
        return this.checkout.sender._id === sender._id;
    }

    itemIsSelected(item: ItemModel) {
        var filtered = this.filter(this.checkout.items, {_id: item._id});
        return filtered.length;
    }

    selectItem(item: ItemModel) {
        var filtered = this.filter(this.checkout.items, {_id: item._id});
        if (filtered.length) {
            this.checkout.items.splice(this.checkout.items.indexOf(filtered[0]), 1);
        } else {
            this.checkout.items.push(item);
        }
    }

    save() {
        var self = this;
        this.resource.save(this.checkout)
            .then((checkout: CheckoutModel) => {
                self.location.path("/checkouts");
            })
            .catch((error: any) => console.log(error));
    }

    delete() {
        var self = this;
        this.resource.delete(this.checkout._id)
            .then(() => self.location.path("/checkouts"))
            .catch((error: any) => console.log(error));

    }
}

angular.module("n4_payment")
    .controller("CheckoutController", [
    "CheckoutResource",
    "$routeParams",
    "$location",
    "$window",
    "filterFilter",
    "SenderResource",
    "PagSeguroResource",
    "ItemResource",
    CheckoutController
]);
