"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
var admins_1 = require("../../access/admins");
var adminsOrLoggedIn_1 = require("../../access/adminsOrLoggedIn");
var adminsOrOrderedBy_1 = require("./access/adminsOrOrderedBy");
var clearUserCart_1 = require("./hooks/clearUserCart");
var populateOrderedBy_1 = require("./hooks/populateOrderedBy");
var updateUserPurchases_1 = require("./hooks/updateUserPurchases");
var LinkToPaymentIntent_1 = require("./ui/LinkToPaymentIntent");
exports.Orders = {
    slug: 'orders',
    admin: {
        useAsTitle: 'createdAt',
        defaultColumns: ['createdAt', 'orderedBy'],
        preview: function (doc) { return "".concat(process.env.PAYLOAD_PUBLIC_SERVER_URL, "/orders/").concat(doc.id); },
    },
    hooks: {
        afterChange: [updateUserPurchases_1.updateUserPurchases, clearUserCart_1.clearUserCart],
    },
    access: {
        read: adminsOrOrderedBy_1.adminsOrOrderedBy,
        update: admins_1.admins,
        create: adminsOrLoggedIn_1.adminsOrLoggedIn,
        delete: admins_1.admins,
    },
    fields: [
        {
            name: 'orderedBy',
            type: 'relationship',
            relationTo: 'users',
            hooks: {
                beforeChange: [populateOrderedBy_1.populateOrderedBy],
            },
        },
        {
            name: 'stripePaymentIntentID',
            label: 'Stripe Payment Intent ID',
            type: 'text',
            admin: {
                position: 'sidebar',
                components: {
                    Field: LinkToPaymentIntent_1.LinkToPaymentIntent,
                },
            },
        },
        {
            name: 'total',
            type: 'number',
            required: true,
            min: 0,
        },
        {
            name: 'items',
            type: 'array',
            fields: [
                {
                    name: 'product',
                    type: 'relationship',
                    relationTo: 'products',
                    required: true,
                },
                {
                    name: 'price',
                    type: 'number',
                    min: 0,
                },
                {
                    name: 'quantity',
                    type: 'number',
                    min: 0,
                },
            ],
        },
    ],
};
