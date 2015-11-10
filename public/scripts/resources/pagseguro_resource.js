"use strict";
;
var PagSeguroResource = (function () {
    function PagSeguroResource($resource) {
        this.provider = $resource("/api/pagseguro/:service/:id", { service: "@service", id: "@id" }, {});
    }
    PagSeguroResource.prototype.send = function (checkout) {
        return this.provider.save({ service: "payments", id: checkout._id })
            .$promise
            .then(function (data) { return data.redirectURL; });
    };
    return PagSeguroResource;
})();
angular.module("n4_payment")
    .factory("PagSeguroResource", [
    "$resource",
    function ($resource) { return new PagSeguroResource($resource); }
]);
