"use strict";
var mongoose = require("mongoose");
var item_model_1 = require("./item_model");
var EnumCurrency = (function () {
    function EnumCurrency() {
    }
    EnumCurrency.real = "BRL";
    return EnumCurrency;
})();
exports.EnumCurrency = EnumCurrency;
;
;
exports.CheckoutSchema = new mongoose.Schema({
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    currency: { type: "string", enum: ["BRL"], required: true },
    items: [
        item_model_1.ItemSchema
    ],
    reference: { type: "string", maxLength: 200 },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "Sender" },
    extraAmount: { type: "number", min: -9999999, max: 9999999 },
    redirectURL: { type: "string", maxLength: 255 },
    notificationURL: { type: "string", maxLength: 255 },
    maxUses: { type: "number", min: 0, max: 999, default: 10 },
    maxAge: { type: "number", min: 30, max: 999999999, default: 120 }
});
exports.CheckoutSchema.static("toPagSeguro", function (checkout) {
    console.log(checkout);
    var data = {
        checkout: {
            currency: checkout.currency,
            reference: checkout.reference,
            redirectURL: checkout.receiver.redirectURL,
            notificationURL: checkout.receiver.notificationURL,
            maxUses: checkout.maxUses,
            maxAge: checkout.maxAge,
            sender: {
                name: checkout.sender.name,
                email: checkout.sender.email,
                bornDate: checkout.sender.bornDate.toISOString().replace(/^(\d{4})-(\d{2})-(\d{2}).*$/, "$3/$2/$1"),
                phone: {
                    areaCode: checkout.sender.phone.areaCode,
                    number: checkout.sender.phone.number
                },
                documents: checkout.sender.documents.map(function (d) {
                    return {
                        document: {
                            type: d.type,
                            value: d.value
                        }
                    };
                })
            },
            items: checkout.items.map(function (i) {
                return {
                    item: {
                        id: i.id,
                        description: i.description,
                        amount: i.amount.toFixed(2),
                        quantity: i.quantity.toFixed(0),
                        shippingCost: i.shippingCost.toFixed(2),
                        weight: i.weight.toFixed(0)
                    }
                };
            })
        }
    };
    if (checkout.shipping) {
        data.checkout.shipping = {
            type: checkout.shipping.type,
            cost: checkout.shipping.cost.toFixed(2),
            address: {
                street: checkout.shipping.address.street,
                number: checkout.shipping.address.number,
                postalCode: checkout.shipping.address.postalCode,
                city: checkout.shipping.address.city,
                state: checkout.shipping.address.state,
                country: checkout.shipping.address.country,
                complement: checkout.shipping.address.complement,
                district: checkout.shipping.address.district
            }
        };
    }
    return data;
});
exports.Checkout = mongoose.model("Checkout", exports.CheckoutSchema);
;
;
;
