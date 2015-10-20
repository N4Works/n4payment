"use strict";
;
var SenderResource = (function () {
    function SenderResource($resource) {
        this.provider = $resource("/api/senders/:id", { id: "@id" }, {
            update: {
                method: "PUT",
                isArray: false
            }
        });
    }
    SenderResource.prototype.save = function (sender) {
        if (!!sender._id) {
            return this.provider.update({ id: sender._id }, sender)
                .$promise
                .then(function (senderData) { return new SenderModel(senderData); });
        }
        return this.provider.save(sender)
            .$promise
            .then(function (senderData) { return new SenderModel(senderData); });
    };
    SenderResource.prototype.findAll = function () {
        return this.provider.query()
            .$promise
            .then(function (senders) { return senders.map(function (u) { return new SenderModel(u); }); });
    };
    SenderResource.prototype.findById = function (id) {
        return this.provider.get({ id: id })
            .$promise
            .then(function (senderData) { return new SenderModel(senderData); });
    };
    SenderResource.prototype.delete = function (id) {
        return this.provider.delete({ id: id })
            .$promise
            .then(function (senderData) { return new SenderModel(senderData); });
    };
    return SenderResource;
})();
angular.module("n4_payment")
    .factory("SenderResource", [
    "$resource",
    function ($resource) { return new SenderResource($resource); }
]);
