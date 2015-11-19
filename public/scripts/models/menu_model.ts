"use strict";

class MenuModel {
    constructor(private name:string, private colorClasses:string, private icon:string, private url:string) {
    }
}

angular.module("n4_payment")
.factory("MenuModel", () => MenuModel);
