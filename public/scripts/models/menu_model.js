"use strict";
var MenuModel = (function () {
    function MenuModel(name, colorClasses, icon, url) {
        this.name = name;
        this.colorClasses = colorClasses;
        this.icon = icon;
        this.url = url;
    }
    return MenuModel;
})();
angular.module("n4_payment")
    .factory("MenuModel", function () { return MenuModel; });
