"use strict";

class ItemsController {
    items: Array<ItemModel>;
    constructor(private resource: ItemResource,
        private notificationsService: n4Notifications.N4NotificationsService,
        private menuService: MenuService) {
        menuService.setPrincipal(new MenuModel("Novo produto", "orange", "add", "/products/new"));

        var self = this;
        resource.findAll()
            .then((items: Array<ItemModel>) => self.items = items)
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));
    }

    delete(item: ItemModel) {
        var self = this;
        this.resource.delete(item._id)
            .then(() => self.items.splice(self.items.indexOf(item), 1))
            .catch((error: any) => self.notificationsService.notifyAlert(error, "Ok"));
    }
}

angular.module("n4_payment")
    .controller("ItemsController", [
    "ItemResource",
    "n4NotificationsService",
    "MenuService",
    ItemsController
]);
