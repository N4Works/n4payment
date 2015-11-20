"use strict";
angular.module("n4_payment")
    .directive("datepicker", [
    "$timeout",
    "$compile",
    function ($timeout, $compile) {
        return {
            restrict: "C",
            scope: {
                options: "=",
                value: "=ngModel"
            },
            link: function (scope, element, attributes) {
                var options = new DatepickerOptionsModel(scope["options"]);
                var $element = $(element).pickadate(options);
                var picker = $(element).pickadate("picker");
            }
        };
    }
]);
