"use strict";

class SendersController {
    sender: SenderModel = new SenderModel();
    senders: Array<SenderModel> = new Array<SenderModel>();
    constructor(private resource: SenderResource) {
        var self = this;
        resource.findAll()
            .then((senders: Array<SenderModel>) => self.senders = senders);
    }

    save() {
        var self = this;
        this.resource.save(this.sender)
            .then((sender: SenderModel) => {
                if (!self.sender._id) {
                    self.senders.unshift(sender);
                }
                self.sender = new SenderModel();
            })
            .catch((error: any) => console.log(error));
    }

    edit(sender: SenderModel) {
        this.sender = sender;
    }

    delete(sender: SenderModel) {
        var self = this;
        this.resource.delete(sender._id)
            .then(() => self.senders.splice(self.senders.indexOf(sender), 1))
            .catch((error: any) => console.log(error));

    }
}

angular.module("n4_payment")
    .controller("SendersController", [
    "SenderResource",
    SendersController
]);
