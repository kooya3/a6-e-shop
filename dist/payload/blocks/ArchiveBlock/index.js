"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Archive = void 0;
var richText_1 = __importDefault(require("../../fields/richText"));
exports.Archive = {
    slug: 'archive',
    labels: {
        singular: 'Archive',
        plural: 'Archives',
    },
    fields: [
        (0, richText_1.default)({
            name: 'introContent',
            label: 'Intro Content',
        }),
        {
            name: 'populateBy',
            type: 'select',
            defaultValue: 'collection',
            options: [
                {
                    label: 'Collection',
                    value: 'collection',
                },
                {
                    label: 'Individual Selection',
                    value: 'selection',
                },
            ],
        },
        {
            type: 'select',
            name: 'relationTo',
            label: 'Collections To Show',
            defaultValue: 'products',
            admin: {
                condition: function (_, siblingData) { return siblingData.populateBy === 'collection'; },
            },
            options: [
                {
                    label: 'Products',
                    value: 'products',
                },
            ],
        },
        {
            type: 'relationship',
            name: 'categories',
            label: 'Categories To Show',
            relationTo: 'categories',
            hasMany: true,
            admin: {
                condition: function (_, siblingData) { return siblingData.populateBy === 'collection'; },
            },
        },
        {
            type: 'number',
            name: 'limit',
            label: 'Limit',
            defaultValue: 10,
            admin: {
                condition: function (_, siblingData) { return siblingData.populateBy === 'collection'; },
                step: 1,
            },
        },
        {
            type: 'relationship',
            name: 'selectedDocs',
            label: 'Selection',
            relationTo: ['products'],
            hasMany: true,
            admin: {
                condition: function (_, siblingData) { return siblingData.populateBy === 'selection'; },
            },
        },
        {
            type: 'relationship',
            name: 'populatedDocs',
            label: 'Populated Docs',
            relationTo: ['products'],
            hasMany: true,
            admin: {
                disabled: true,
                description: 'This field is auto-populated after-read',
                condition: function (_, siblingData) { return siblingData.populateBy === 'collection'; },
            },
        },
        {
            type: 'number',
            name: 'populatedDocsTotal',
            label: 'Populated Docs Total',
            admin: {
                step: 1,
                disabled: true,
                description: 'This field is auto-populated after-read',
                condition: function (_, siblingData) { return siblingData.populateBy === 'collection'; },
            },
        },
    ],
};
