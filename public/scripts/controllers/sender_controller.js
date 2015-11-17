"use strict";
var SenderController = (function () {
    function SenderController(resource, parameters, location) {
        this.resource = resource;
        this.parameters = parameters;
        this.location = location;
        var self = this;
        if (parameters["id"]) {
            resource.findById(parameters["id"])
                .then(function (sender) { return self.sender = sender; })
                .catch(function (error) { return console.log(error); });
        }
        else {
            this.sender = new SenderModel();
        }
    }
    SenderController.prototype.save = function () {
        var self = this;
        this.resource.save(this.sender)
            .then(function (sender) {
            self.location.path("/senders");
        })
            .catch(function (error) { return console.log(error); });
    };
    SenderController.prototype.delete = function () {
        var self = this;
        this.resource.delete(this.sender._id)
            .then(function () { return self.location.path("/senders"); })
            .catch(function (error) { return console.log(error); });
    };
    return SenderController;
})();
angular.module("n4_payment")
    .controller("SenderController", [
    "SenderResource",
    "$routeParams",
    "$location",
    SenderController
]);
