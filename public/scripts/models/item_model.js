"use strict";
var ItemModel = (function () {
    function ItemModel(itemData) {
        angular.extend(this, itemData);
    }
    return ItemModel;
})();
angular.module("n4_payment")
    .factory("ItemModel", function () { return ItemModel; });
