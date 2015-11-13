"use strict";

class ItemsController {
    item:ItemModel;
    items:Array<ItemModel>;
    constructor(private resource:ItemResource) {
        this.item = new ItemModel();
        var self = this;
        resource.findAll()
            .then((items:Array<ItemModel>) => self.items = items);
    }

    save() {
        var self = this;
        this.resource.save(this.item)
            .then((item: ItemModel) => {
                if (!self.item._id) {
                    self.items.unshift(item);
                }
                self.item = new ItemModel();
            })
            .catch((error: any) => console.log(error));
    }

    edit(item: ItemModel) {
        this.item = item;
    }

    delete(item: ItemModel) {
        var self = this;
        this.resource.delete(item._id)
            .then(() => self.items.splice(self.items.indexOf(item), 1))
            .catch((error: any) => console.log(error));
    }
}

angular.module("n4_payment")
    .controller("ItemsController", [
        "ItemResource",
        ItemsController
    ]);
