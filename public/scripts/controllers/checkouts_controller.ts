"use strict";

class CheckoutsController {
    checkout:CheckoutModel;
    item:ItemModel;
    itemSelected:ItemModel;
    checkouts:Array<CheckoutModel>;
    senders:Array<SenderModel>;
    users:Array<UserModel>;
    constructor(private resource:CheckoutResource, private userResource:UserResource, private senderResource:SenderResource) {
        this.checkout = new CheckoutModel();
        this.item = new ItemModel();
        var self = this;
        resource.findAll()
            .then((checkouts:Array<CheckoutModel>) => self.checkouts = checkouts);
        senderResource.findAll()
            .then((senders: Array<SenderModel>) => self.senders = senders);
        userResource.findAll()
            .then((users: Array<UserModel>) => self.users = users);
    }

    selectUser(user:UserModel) {
        this.checkout.receiver = user;
    }

    selectSender(sender:SenderModel) {
        this.checkout.sender = sender;
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
        this.checkout = checkout;
    }

    delete(checkout: CheckoutModel) {
        var self = this;
        this.resource.delete(checkout._id)
            .then(() => self.checkouts.splice(self.checkouts.indexOf(checkout), 1))
            .catch((error: any) => console.log(error));

    }

    editItem(item: ItemModel) {
        this.itemSelected = item;
        this.item = new ItemModel(angular.copy(item));
    }

    saveItem() {
        var indice = this.checkout.items.indexOf(this.itemSelected);
        this.checkout.items.splice(indice, 1, this.item);
        delete this.itemSelected;
        this.item = new ItemModel();
    }

    deleteItem(item: ItemModel) {
        var indice = this.checkout.items.indexOf(item);
        this.checkout.items.splice(indice, 1);
    }
}

angular.module("n4_payment")
    .controller("CheckoutsController", [
        "CheckoutResource",
        "UserResource",
        "SenderResource",
        CheckoutsController
    ]);