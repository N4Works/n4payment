"use strict";

class CheckoutsController {
    checkout:CheckoutModel;
    checkouts:Array<CheckoutModel>;
    senders:Array<SenderModel>;
    items:Array<ItemModel>;
    constructor(private $window: ng.IWindowService,
        private filter: ng.IFilterFilter,
        private resource:CheckoutResource,
        private senderResource:SenderResource,
        private pagseguroResource:PagSeguroResource,
        private itemResource:ItemResource) {
        this.checkout = new CheckoutModel();
        var self = this;
        resource.findAll()
            .then(checkouts => self.checkouts = checkouts);
        senderResource.findAll()
            .then(senders => self.senders = senders);
        itemResource.findAll()
            .then(items => self.items = items);
    }

    selectSender(sender:SenderModel) {
        this.checkout.sender = sender;
    }

    senderIsSelected(sender: SenderModel) {
        return this.checkout.sender._id === sender._id;
    }

    save() {
        var self = this;
        this.resource.save(this.checkout)
            .then((checkout: CheckoutModel) => {
                if (!self.checkout._id) {
                    self.checkouts.unshift(checkout);
                }
                self.checkout = new CheckoutModel();
            })
            .catch((error: any) => console.log(error));
    }

    edit(checkout: CheckoutModel) {
        this.resource.findById(checkout._id)
            .then((checkoutCompleto: CheckoutModel) => {
                this.checkout = angular.extend(checkout, checkoutCompleto);
            })
            .catch(e => console.log(e));
    }

    delete(checkout: CheckoutModel) {
        var self = this;
        this.resource.delete(checkout._id)
            .then(() => self.checkouts.splice(self.checkouts.indexOf(checkout), 1))
            .catch((error: any) => console.log(error));

    }

    send(checkout: CheckoutModel) {
        var self = this;
        this.pagseguroResource.send(checkout)
            .then((redirectURL: string) => self.$window.location.href = redirectURL)
            .catch(e => console.log(e));
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
}

angular.module("n4_payment")
    .controller("CheckoutsController", [
        "$window",
        "filterFilter",
        "CheckoutResource",
        "SenderResource",
        "PagSeguroResource",
        "ItemResource",
        CheckoutsController
    ]);
