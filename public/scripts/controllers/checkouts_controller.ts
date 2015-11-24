"use strict";

class CheckoutsController {
    checkouts: Array<CheckoutModel>;
    constructor(private $window: ng.IWindowService,
        private filter: ng.IFilterFilter,
        private resource: CheckoutResource,
        private pagseguroResource: PagSeguroResource,
        private notificationsService: n4Notifications.N4NotificationsService,
        private menuService: MenuService) {
        menuService.setPrincipal(new MenuModel("Novo pagamento", "red", "add", "/checkouts/new"));

        var self = this;
        resource.findAll()
            .then(checkouts => self.checkouts = checkouts)
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));
    }

    delete(checkout: CheckoutModel) {
        var self = this;
        this.resource.delete(checkout._id)
            .then(() => self.checkouts.splice(self.checkouts.indexOf(checkout), 1))
            .catch((error: any) => self.notificationsService.notifyAlert(error, "Ok"));

    }

    send(checkout: CheckoutModel) {
        var self = this;
        this.pagseguroResource.send(checkout)
            .then((redirectURL: string) => self.$window.location.href = redirectURL)
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));
    }
}

angular.module("n4_payment")
    .controller("CheckoutsController", [
    "$window",
    "filterFilter",
    "CheckoutResource",
    "PagSeguroResource",
    "n4NotificationsService",
    "MenuService",
    CheckoutsController
]);
