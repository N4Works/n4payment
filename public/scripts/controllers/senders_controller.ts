"use strict";

class SendersController {
    senders: Array<SenderModel> = new Array<SenderModel>();
    constructor(private resource: SenderResource,
        private notificationsService: n4Notifications.N4NotificationsService,
        private menuService: MenuService) {
        menuService.setPrincipal(new MenuModel("Novo comprador", "yellow darken-2", "add", "/senders/new"));

        var self = this;
        resource.findAll()
            .then((senders: Array<SenderModel>) => self.senders = senders)
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));
    }

    delete(sender: SenderModel) {
        var self = this;
        this.resource.delete(sender._id)
            .then(() => self.senders.splice(self.senders.indexOf(sender), 1))
            .catch(error => self.notificationsService.notifyAlert(error, "Ok"));

    }
}

angular.module("n4_payment")
    .controller("SendersController", [
    "SenderResource",
    "n4NotificationsService",
    "MenuService",
    SendersController
]);
