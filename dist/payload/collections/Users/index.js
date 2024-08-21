"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var admins_1 = require("../../access/admins");
var anyone_1 = require("../../access/anyone");
var adminsAndUser_1 = __importDefault(require("./access/adminsAndUser"));
var checkRole_1 = require("./checkRole");
var customer_1 = require("./endpoints/customer");
var createStripeCustomer_1 = require("./hooks/createStripeCustomer");
var ensureFirstUserIsAdmin_1 = require("./hooks/ensureFirstUserIsAdmin");
var loginAfterCreate_1 = require("./hooks/loginAfterCreate");
var resolveDuplicatePurchases_1 = require("./hooks/resolveDuplicatePurchases");
var CustomerSelect_1 = require("./ui/CustomerSelect");
var Users = {
    slug: 'users',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'email'],
    },
    access: {
        read: adminsAndUser_1.default,
        create: anyone_1.anyone,
        update: adminsAndUser_1.default,
        delete: admins_1.admins,
        admin: function (_a) {
            var user = _a.req.user;
            return (0, checkRole_1.checkRole)(['admin'], user);
        },
    },
    hooks: {
        beforeChange: [createStripeCustomer_1.createStripeCustomer],
        afterChange: [loginAfterCreate_1.loginAfterCreate],
    },
    auth: true,
    endpoints: [
        {
            path: '/:teamID/customer',
            method: 'get',
            handler: customer_1.customerProxy,
        },
        {
            path: '/:teamID/customer',
            method: 'patch',
            handler: customer_1.customerProxy,
        },
    ],
    fields: [
        {
            name: 'name',
            type: 'text',
        },
        {
            name: 'roles',
            type: 'select',
            hasMany: true,
            defaultValue: ['customer'],
            options: [
                {
                    label: 'admin',
                    value: 'admin',
                },
                {
                    label: 'customer',
                    value: 'customer',
                },
            ],
            hooks: {
                beforeChange: [ensureFirstUserIsAdmin_1.ensureFirstUserIsAdmin],
            },
            access: {
                read: admins_1.admins,
                create: admins_1.admins,
                update: admins_1.admins,
            },
        },
        {
            name: 'purchases',
            label: 'Purchases',
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
            hooks: {
                beforeChange: [resolveDuplicatePurchases_1.resolveDuplicatePurchases],
            },
        },
        {
            name: 'stripeCustomerID',
            label: 'Stripe Customer',
            type: 'text',
            access: {
                read: function (_a) {
                    var user = _a.req.user;
                    return (0, checkRole_1.checkRole)(['admin'], user);
                },
            },
            admin: {
                position: 'sidebar',
                components: {
                    Field: CustomerSelect_1.CustomerSelect,
                },
            },
        },
        {
            label: 'Cart',
            name: 'cart',
            type: 'group',
            fields: [
                {
                    name: 'items',
                    label: 'Items',
                    type: 'array',
                    interfaceName: 'CartItems',
                    fields: [
                        {
                            name: 'product',
                            type: 'relationship',
                            relationTo: 'products',
                        },
                        {
                            name: 'quantity',
                            type: 'number',
                            min: 0,
                            admin: {
                                step: 1,
                            },
                        },
                    ],
                },
                // If you wanted to maintain a 'created on'
                // or 'last modified' date for the cart
                // you could do so here:
                // {
                //   name: 'createdOn',
                //   label: 'Created On',
                //   type: 'date',
                //   admin: {
                //     readOnly: true
                //   }
                // },
                // {
                //   name: 'lastModified',
                //   label: 'Last Modified',
                //   type: 'date',
                //   admin: {
                //     readOnly: true
                //   }
                // },
            ],
        },
        {
            name: 'skipSync',
            label: 'Skip Sync',
            type: 'checkbox',
            admin: {
                position: 'sidebar',
                readOnly: true,
                hidden: true,
            },
        },
    ],
    timestamps: true,
};
exports.default = Users;
