"use strict";

class CheckoutsController {
    checkouts:Array<CheckoutModel>;
    constructor(private $window: ng.IWindowService,
        private filter: ng.IFilterFilter,
        private resource:CheckoutResource,
        private pagseguroResource:PagSeguroResource) {
        var self = this;
        resource.findAll()
            .then(checkouts => self.checkouts = checkouts);
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
}

angular.module("n4_payment")
    .controller("CheckoutsController", [
        "$window",
        "filterFilter",
        "CheckoutResource",
        "PagSeguroResource",
        CheckoutsController
    ]);
