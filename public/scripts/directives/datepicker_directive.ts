"use strict";

angular.module("n4_payment")
    .directive("datepicker", [
    "$timeout",
    "$compile",
    ($timeout: ng.ITimeoutService, $compile: ng.ICompileService) => {
        return {
            restrict: "C",
            scope: {
                options: "=",
                value: "=ngModel"
            },
            link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => {
                var options: DatepickerOptionsModel = new DatepickerOptionsModel(scope["options"]);
                var $element = (<any>$(element)).pickadate(options);
                var picker = (<any>$(element)).pickadate("picker");

                //Todo: Não implementado.
            }
        }
    }
]);
