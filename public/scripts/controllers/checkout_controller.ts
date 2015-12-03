"use strict";

class CheckoutController {
    private checkout: CheckoutModel;
    private senders: Array<SenderModel>;
    private items: Array<ItemModel>;
    constructor(private resource: CheckoutResource,
        private parameters: ng.route.IRouteParamsService,
        private location: ng.ILocationService,
        private $window: ng.IWindowService,
        private $q: ng.IQService,
        private filter: ng.IFilterFilter,
        private senderResource: SenderResource,
        private pagseguroResource: PagSeguroResource,
        private itemResource: ItemResource,
        private notificationsService: n4Notifications.N4NotificationsService,
        private menuService: MenuService) {
        menuService.setPrincipal(new MenuModel("Novo pagamento", "red", "add", "/checkouts/new"));

        var self = this;
        this.checkout = new CheckoutModel();
        senderResource.findAll()
            .then(senders => self.senders = senders)
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));
        var itemPromise = itemResource.findAll()
            .then(items => self.items = items)
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));
        if (parameters["id"]) {
            $q.all([itemPromise,
                    resource.findById(parameters["id"])
                        .then(checkout => self.checkout = checkout)
                        .catch(error => self.notificationsService.notifyAlert(error, "Ok"))])
                .then((results:Array<any>) => {
                    angular.forEach(results[1].items, i => {
                        var item = <ItemModel>filter(results[0], {_id:i._id})[0];
                        item.quantity = i.quantity;
                    });
                });


        }
    }

    selectSender(sender: SenderModel) {
        this.checkout.sender = sender;
    }

    senderIsSelected(sender: SenderModel) {
        return this.checkout.sender._id === sender._id;
    }

    itemIsSelected(item: ItemModel) {
        return !!item.quantity;
    }

    save() {
        var self = this;
        this.checkout.items = this.filter(this.items, (item) => item.quantity > 0);
        this.resource.save(this.checkout)
            .then((checkout: CheckoutModel) => {
                self.notificationsService.notifySuccess("Cadastro realizado.", "Ok");
                self.location.path("/checkouts");
            })
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));
    }

    delete() {
        var self = this;
        this.resource.delete(this.checkout._id)
            .then(() => self.location.path("/checkouts"))
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));

    }
}

angular.module("n4_payment")
    .controller("CheckoutController", [
    "CheckoutResource",
    "$routeParams",
    "$location",
    "$window",
    "$q",
    "filterFilter",
    "SenderResource",
    "PagSeguroResource",
    "ItemResource",
    "n4NotificationsService",
    "MenuService",
    CheckoutController
]);
