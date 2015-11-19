"use strict";

class MenuService {
    principal: MenuModel;
    itens: Array<MenuModel>;
    constructor() {
        this.itens = new Array<MenuModel>();
    }

    setPrincipal(menu: MenuModel) {
        this.principal = menu;
        return this;
    }

    add(menu:MenuModel):MenuService {
        this.itens.push(menu);
        return this;
    }

    delete(menu:MenuModel):MenuService {
        var index = this.itens.indexOf(menu);
        if (~index) {
            this.itens.splice(index, 1);
        }
        return this;
    }
}

angular.module("n4_payment")
.service("MenuService", () => new MenuService());
