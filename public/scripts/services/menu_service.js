"use strict";
var MenuService = (function () {
    function MenuService() {
        this.itens = new Array();
    }
    MenuService.prototype.setPrincipal = function (menu) {
        this.principal = menu;
        return this;
    };
    MenuService.prototype.add = function (menu) {
        this.itens.push(menu);
        return this;
    };
    MenuService.prototype.delete = function (menu) {
        var index = this.itens.indexOf(menu);
        if (~index) {
            this.itens.splice(index, 1);
        }
        return this;
    };
    return MenuService;
})();
angular.module("n4_payment")
    .service("MenuService", function () { return new MenuService(); });
