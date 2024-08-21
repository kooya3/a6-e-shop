"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admins_1 = require("../../access/admins");
var ArchiveBlock_1 = require("../../blocks/ArchiveBlock");
var CallToAction_1 = require("../../blocks/CallToAction");
var Content_1 = require("../../blocks/Content");
var MediaBlock_1 = require("../../blocks/MediaBlock");
var slug_1 = require("../../fields/slug");
var populateArchiveBlock_1 = require("../../hooks/populateArchiveBlock");
var checkUserPurchases_1 = require("./access/checkUserPurchases");
var beforeChange_1 = require("./hooks/beforeChange");
var deleteProductFromCarts_1 = require("./hooks/deleteProductFromCarts");
var revalidateProduct_1 = require("./hooks/revalidateProduct");
var ProductSelect_1 = require("./ui/ProductSelect");
var Products = {
    slug: 'products',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'stripeProductID', '_status'],
        preview: function (doc) {
            return "".concat(process.env.PAYLOAD_PUBLIC_SERVER_URL, "/next/preview?url=").concat(encodeURIComponent("".concat(process.env.PAYLOAD_PUBLIC_SERVER_URL, "/products/").concat(doc.slug)), "&secret=").concat(process.env.PAYLOAD_PUBLIC_DRAFT_SECRET);
        },
    },
    hooks: {
        beforeChange: [beforeChange_1.beforeProductChange],
        afterChange: [revalidateProduct_1.revalidateProduct],
        afterRead: [populateArchiveBlock_1.populateArchiveBlock],
        afterDelete: [deleteProductFromCarts_1.deleteProductFromCarts],
    },
    versions: {
        drafts: true,
    },
    access: {
        read: function () { return true; },
        create: admins_1.admins,
        update: admins_1.admins,
        delete: admins_1.admins,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'publishedOn',
            type: 'date',
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
            hooks: {
                beforeChange: [
                    function (_a) {
                        var siblingData = _a.siblingData, value = _a.value;
                        if (siblingData._status === 'published' && !value) {
                            return new Date();
                        }
                        return value;
                    },
                ],
            },
        },
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'layout',
                            type: 'blocks',
                            blocks: [CallToAction_1.CallToAction, Content_1.Content, MediaBlock_1.MediaBlock, ArchiveBlock_1.Archive],
                        },
                    ],
                },
                {
                    label: 'Product Details',
                    fields: [
                        {
                            name: 'stripeProductID',
                            label: 'Stripe Product',
                            type: 'text',
                            admin: {
                                components: {
                                    Field: ProductSelect_1.ProductSelect,
                                },
                            },
                        },
                        {
                            name: 'priceJSON',
                            label: 'Price JSON',
                            type: 'textarea',
                            admin: {
                                readOnly: true,
                                hidden: true,
                                rows: 10,
                            },
                        },
                        {
                            name: 'enablePaywall',
                            label: 'Enable Paywall',
                            type: 'checkbox',
                        },
                        {
                            name: 'paywall',
                            label: 'Paywall',
                            type: 'blocks',
                            access: {
                                read: checkUserPurchases_1.checkUserPurchases,
                            },
                            blocks: [CallToAction_1.CallToAction, Content_1.Content, MediaBlock_1.MediaBlock, ArchiveBlock_1.Archive],
                        },
                    ],
                },
            ],
        },
        {
            name: 'categories',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'relatedProducts',
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
            filterOptions: function (_a) {
                var id = _a.id;
                return {
                    id: {
                        not_in: [id],
                    },
                };
            },
        },
        (0, slug_1.slugField)(),
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
};
exports.default = Products;
